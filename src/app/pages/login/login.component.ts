import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService, FacebookLoginProvider, GoogleLoginProvider, SocialUser } from 'angular5-social-login';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  private user: SocialUser;
  public authorized: boolean = false;

  constructor(private socialAuthService: AuthService) {}

  ngOnInit() {
  }

  // public socialSignIn(socialPlatform : string) {

  //   let socialPlatformProvider;
  //   if(socialPlatform == "google"){
  //     socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
  //   }

  //   this.socialAuthService.signIn(socialPlatformProvider).then(
  //     (userData) => {
  //       console.log(socialPlatform+" sign in data : " , userData);

  //       if (userData != null) {
  //              this.authorized = true;
  //              this.user = userData;
  //           }
  //     }
  //   );
  // }

  // public signOut(){
  //     this.socialAuthService.signOut();
  //     this.authorized = false;
  // }

  ngOnDestroy() {
  }

}
