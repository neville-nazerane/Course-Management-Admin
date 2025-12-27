import { inject, Injectable, Type } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { firstValueFrom } from "rxjs";
import { ConfirmDialog } from "../dialogs/confirm-dialog";


@Injectable({providedIn: 'root'})
export class DialogService {

    private dialog = inject(MatDialog);

    open<T>(component: Type<T>): MatDialogRef<T> {
        return this.dialog.open(component);
    }

    async openConfirm(message: string): Promise<boolean> {
        return await this.openDialogAndWait<ConfirmDialog, boolean>(ConfirmDialog, message);
    }


    openDialogAndWait<TComponent, TResponse>(component: Type<TComponent>, data?: unknown): Promise<TResponse> {
        return firstValueFrom(
            this.dialog.open(component, { data }).afterClosed()
        );
    }


}