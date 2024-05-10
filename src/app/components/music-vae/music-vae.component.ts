import { Component } from '@angular/core';
import { MusicVAE, Player } from '@magenta/music/es6';

@Component({
  selector: 'app-music-vae',
  standalone: true,
  imports: [],
  templateUrl: './music-vae.component.html',
  styleUrl: './music-vae.component.scss'
})
export class MusicVaeComponent {
  generateMusic() {
    const model = new MusicVAE('assets/files/checkpoints/mel_4bar_med_lokl_q2');
    const player = new Player();
    
    model
      .initialize()
      .then(() => model.sample(1))
      .then(samples => {
        player.resumeContext();
        player.start(samples[0])
      });
  }
}
