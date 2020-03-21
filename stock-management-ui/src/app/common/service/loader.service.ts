import { Injectable, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs';
import { LoaderState } from './../loader';
import { OverlayRef, Overlay, OverlayConfig, PositionStrategy } from '@angular/cdk/overlay';
import { LoaderComponent } from './../component/loader/loader.component';
import { ComponentPortal, TemplatePortal } from '@angular/cdk/portal';
@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  constructor(
    private overlay: Overlay
  ) { }
  createOverlay(config: AppOverlayConfig): OverlayRef {
    return this.overlay.create(config);
  }
  attachTemplatePortal(overlayRef: OverlayRef, templateRef: TemplateRef<any>, vcRef: ViewContainerRef) {
    let templatePortal = new TemplatePortal(templateRef, vcRef);
    overlayRef.attach(templatePortal);
  }
  positionGloballyCenter(): PositionStrategy {
    return this.overlay.position()
      .global()
      .centerHorizontally()
      .centerVertically();
  }
}
export interface AppOverlayConfig extends OverlayConfig { }
