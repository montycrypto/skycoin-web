import { Component, OnInit, Inject } from '@angular/core';
import { WalletService } from '../../../../services/wallet.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';
import {Wallet} from '../../../../../../app.datatypes';

@Component({
  selector: 'app-change-name',
  templateUrl: './change-name.component.html',
  styleUrls: ['./change-name.component.css']
})
export class ChangeNameComponent implements OnInit {

  form: FormGroup;

  constructor(
    @Inject(MD_DIALOG_DATA) private data: Wallet,
    public dialogRef: MdDialogRef<ChangeNameComponent>,
    private formBuilder: FormBuilder,
    private walletService: WalletService,
  ) {}

  ngOnInit() {
    this.initForm();
  }

  rename() {
    this.data.label = this.form.value.label;
    this.walletService.updateWallet(this.data);
    this.dialogRef.close();
  }

  private initForm() {
    this.form = this.formBuilder.group({
      label: [this.data.label, Validators.required],
    });
  }
}
