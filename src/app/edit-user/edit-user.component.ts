import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  

  userId: number=0;
  user: any={};

  constructor(private userService: UserService,private router: Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.userId = params['id'];
      // console.log(this.userId);
      this.fetchUserData();
    });
  }

  fetchUserData(): void {
    this.userService.getUser().subscribe((users)=>{
      // console.log(users);
      this.user = users.find(user => user.id === this.userId) ;
    })
    // console.log(this.user);
  }


  saveChanges(): void {
    // Save changes to the user data
  }

  goBack(): void {
    // Navigate back to the user list
    this.router.navigate(['/users']);
  }

}
