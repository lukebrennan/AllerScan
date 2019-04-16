import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Storage } from '@ionic/storage';

@Injectable()
export class DBStorage {

    private sqlite: SQLite;
    private database: SQLiteObject;
    private isOpen: boolean = false;
    private value: any = '';

    public constructor(
        public platform: Platform,
        private storage: Storage
    ) {
        platform.ready().then(() => {
            // Is not cordova == web PWA
            if (!platform.is('cordova')) {
                // do nothing     
            } else {
                // device
                this.openDB().then(() => {
                    console.log('db opened OK');
                });
            }
        });
    }

    openDB() {
        let promise = new Promise((resolve, reject) => {
            if (!this.isOpen) {
                this.sqlite = new SQLite();
                this.sqlite.create({ name: "data.db", location: "default" })
                    .then((db: SQLiteObject) => {
                        this.database = db;
                        this.database.executeSql("CREATE TABLE IF NOT EXISTS datalist (key TEXT, value TEXT)", [])
                            .then(() => {
                                console.log('Executed create SQL');
                                this.isOpen = true;
                                resolve(this.isOpen);
                            })
                            .catch(e => {
                                console.log(e)
                                this.isOpen = false;
                                reject(this.isOpen);
                            });
                    });
            } else {
                resolve(this.isOpen);
            }
        });
        return promise;
    }

    getValue(key: string) {
        let promise = new Promise((resolve, reject) => {
            this.platform.ready().then(() => {
                // Is not cordova == web PWA (no device)
                if (!this.platform.is('cordova')) {
                    this.storage.get(key).then((val) => {
                        this.value = val;
                        resolve(this.value);
                    }).catch(() => {
                        reject('no platform error pwa');
                    });
                } else {
                    // device 
                    this.openDB().then(() => {
                        let select = "SELECT * FROM datalist where key ='" + key + "' ";
                        this.database.executeSql(select, []).then((data) => {
                            let value = '';
                            if (data.rows.length > 0) {
                                value = data.rows.item(0).value;
                            }
                            resolve(value);
                        }, (error) => {
                        }).catch(() => {
                            reject('no platform error sqlite pwa');
                        });
                    });
                }
            }).catch(() => {
                reject('no platform.error');
            });
        });
        return promise;
    }

    setValue(key: string, value: string) {

        this.platform.ready().then(() => {
            // Is not cordova == web PWA
            if (!this.platform.is('cordova')) {
                this.storage.set(key, value);
            } else {
                // device 
                this.openDB().then(() => {
                    let select = "SELECT * FROM datalist where key ='" + key + "' ";
                    this.database.executeSql(select, []).then((data) => {
                        if (data.rows.length > 0) {
                            // if key exists -> update
                            this.database.executeSql("UPDATE datalist SET value = ? WHERE key = ? ", [value, key]).then((data) => {
                                console.log('update successful');
                            }, (error) => {
                                console.log('setValue. update error');
                                console.log(error);
                            });
                        } else {
                            // else -> insert new key 
                            this.database.executeSql("INSERT INTO datalist (key, value) VALUES (?, ?)", [key, value]).then((data) => {
                                console.log('insert successful');
                            }, (error) => {
                                console.log('setValue. insert error');
                                console.log(error);
                            });
                        }
                    }, (error) => {
                        console.log('error setValue.select: ' + error);
                    });
                });
            }
        });
    }

    removeKey(key: string) {

        this.platform.ready().then(() => {
            // Is not cordova == web PWA
            if (!this.platform.is('cordova')) {
                this.storage.remove(key);
            } else {
                // device 
                this.openDB().then(() => {
                    // delete key 
                    this.database.executeSql("DELETE FROM datalist WHERE key ='" + key + "'", []).then((data) => {
                        console.log('delete successful');
                    }, (error) => {
                        console.log('delete error');
                        console.log(error);
                    });
                });
            }
        });
    }
}