import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-onboarding-encrypt-wallet',
  templateUrl: './onboarding-encrypt-wallet.component.html',
  styleUrls: ['./onboarding-encrypt-wallet.component.scss'],
})
export class OnboardingEncryptWalletComponent implements OnInit {
  encryptWallet = false;
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.initEncryptForm();
  }

  initEncryptForm() {
    this.form = this.formBuilder.group({
      password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      confirm: new FormControl('',
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          this.validateAreEqual.bind(this),
        ]),
      ),
    });

    this.form.controls.password.valueChanges.subscribe(() => {
      this.form.controls.confirm.updateValueAndValidity();
    });

    this.form.disable();
  }

  setEncrypt(event) {
    this.encryptWallet = event.checked;
    if (this.encryptWallet) {
      this.form.enable();
    } else {
      this.form.disable();
    }
  }

  private validateAreEqual(fieldControl: FormControl) {
    if (this.form && this.form.controls.password) {
      return fieldControl.value === this.form.controls.password.value ? null : { NotEqual: true };
    }
  }
}