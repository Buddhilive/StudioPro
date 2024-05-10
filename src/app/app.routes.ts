import { Routes } from '@angular/router';
import { MusicVaeComponent } from './components/music-vae/music-vae.component';

export const routes: Routes = [
    {
        path: '',
        component: MusicVaeComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];
