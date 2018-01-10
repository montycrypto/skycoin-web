import { Component, Input } from '@angular/core';
import { WalletService } from '../../../../services/wallet.service';
import { MdDialog, MdDialogConfig } from '@angular/material';
import { ChangeNameComponent } from '../change-name/change-name.component';
import { QrCodeComponent } from '../../../layout/qr-code/qr-code.component';
import { UnlockWalletComponent } from '../unlock-wallet/unlock-wallet.component';
import {Wallet} from '../../../../../../app.datatypes';

@Component({
  selector: 'app-wallet-detail',
  templateUrl: './wallet-detail.component.html',
  styleUrls: ['./wallet-detail.component.css']
})
export class WalletDetailComponent {
  @Input() wallet: Wallet;

  constructor(
    public walletService: WalletService,
    private dialog: MdDialog,
  ) {}

  addAddress() {
    this.walletService.addAddress(this.wallet);
  }

  renameWallet() {
    const config = new MdDialogConfig();
    config.width = '500px';
    config.data = this.wallet;
    this.dialog.open(ChangeNameComponent, config);
  }

  showQr(address) {
    const config = new MdDialogConfig();
    config.data = address;
    this.dialog.open(QrCodeComponent, config);
  }

  unlockWallet() {
    const config = new MdDialogConfig();
    config.width = '500px';
    config.data = this.wallet;
    this.dialog.open(UnlockWalletComponent, config);
  }
}
