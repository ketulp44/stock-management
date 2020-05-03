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
  private loaderSubject = new Subject<LoaderState>();
  loaderState = this.loaderSubject.asObservable();
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
  showLoader() {
    this.loaderSubject.next(<LoaderState>{show:true});
  }
  hideLoader() {
    this.loaderSubject.next(<LoaderState>{show:false});
  }
}
export interface AppOverlayConfig extends OverlayConfig { }
