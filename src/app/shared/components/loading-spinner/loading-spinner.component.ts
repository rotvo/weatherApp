import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'loading-spinner',
  templateUrl: 'loading-spinner.component.html',
  styleUrl: 'loading-spinner.component.css',
  standalone: true,
  imports: [MatProgressSpinnerModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingSpinnerComponent { }
