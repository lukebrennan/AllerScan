import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core'
import { TabsPage } from './tabs.page';

const routes: Routes = [
    {
        path: '',
        component: TabsPage,
        children: [    
        { path: 'feed', loadChildren: '../feed/feed.module#FeedPageModule' },
        { path: 'profile', loadChildren: '../profile/profile.module#ProfilePageModule'},
        { path: 'scan', loadChildren: '../scan/scan.module#ScanPageModule'}
    ]
    }

];

@NgModule({
    imports: [
      RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
  })
  export class TabsRoutingModule { }
  