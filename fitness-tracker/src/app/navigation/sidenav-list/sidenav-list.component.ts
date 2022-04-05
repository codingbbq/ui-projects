import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit, OnDestroy {

  @Output()
  sideNavToggle = new EventEmitter<void>();
  isAuth?: boolean;
  authSubscription?: Subscription;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authSubscription = this.authService.authChange.subscribe(authstatus => {
      this.isAuth = authstatus;
    });
  }

  onToggleSideNav() {
    this.sideNavToggle.emit();
  }

  ngOnDestroy() {
    this.authSubscription?.unsubscribe();
  }

  onLogout() {
    this.onToggleSideNav();
    this.authService.logout();
  }

}
