import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../model/user.model';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  constructor(private userService:UserService,private route: Router){}
  users: User[] = [];
  filteredUsers:User[]=[];
  currentPage = 1;
  pageSize = 10;
  totalRecords = 0;
  selectAll = false;
  searchTerm = '';


  ngOnInit(): void {
    this.loadedUser();
  }

  loadedUser(): void{
    this.userService.getUser().subscribe((users)=>{
      this.totalRecords = users.length;
      this.users=this.paginateUsers(users);
      this.filteredUsers=this.paginateUsers(users);
      this.initializeSelectionStatus();
      this.selectAll = false;
    });
  }

  paginateUsers(filteredUsers: User[]): User[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return filteredUsers.slice(startIndex, startIndex + this.pageSize);
  }


  initializeSelectionStatus(): void {
    this.users.forEach((user) => (user.selected = false));
  }

  onSearchChange(): void {
    this.filteredUsers = this.users.filter(user =>
      user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(this.searchTerm.toLowerCase()) 
    );
    // console.log(this.filteredUsers);
    }
  
    

  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.loadedUser();
  }


  getPageNumbers(): number[] {
    if (this.totalRecords <= this.pageSize) {
      return [];
    }
    return this.getVisiblePageNumbers();
  }

  onNextPage(): void {
    const totalPages = Math.ceil(this.totalRecords / this.pageSize);
    if (this.currentPage < totalPages) {
      this.onPageChange(this.currentPage + 1);
    }
  }

  onPreviousPage(): void {
    if (this.currentPage > 1) {
      this.onPageChange(this.currentPage - 1);
    }
  }

  visiblePageCount = 5;

  getVisiblePageNumbers(): number[] {
    const totalPages = Math.ceil(this.totalRecords / this.pageSize);
    const startPage = Math.max(1, this.currentPage - Math.floor(this.visiblePageCount / 2));
    const endPage = Math.min(totalPages, startPage + this.visiblePageCount - 1);
    return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
  }

  toggleSelectAll(): void {
    this.filteredUsers.forEach((user) => (user.selected = this.selectAll));
  }

  deleteSelected(): void {
    this.filteredUsers = this.filteredUsers.filter((user) => !user.selected);
  }

  deleteParticular(id:Number){
    this.filteredUsers=this.filteredUsers.filter((user)=>user.id!==id);
  }


  onFirstPage(): void {
    this.onPageChange(1);
  }


  onLastPage(): void {
    const totalPages = Math.ceil(this.totalRecords / this.pageSize);
    this.onPageChange(totalPages);
  }




  editSelect(id:Number){
    this.route.navigateByUrl(`edit-user/${id}`);
  }






}
