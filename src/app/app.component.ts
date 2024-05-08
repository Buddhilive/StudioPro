import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MusicVAE, Player } from '@magenta/music/es6';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
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
