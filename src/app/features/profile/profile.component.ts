import { Component, inject, signal } from '@angular/core';
import { ProfileService } from '../../core/services/profile.service';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [ReactiveFormsModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  profSer= inject(ProfileService)
  content = signal<string>('addresses');
  addressesCount = this.profSer.addressesCount()
  changeContent(content: string) {
    this.content.set(content);
  }
}
