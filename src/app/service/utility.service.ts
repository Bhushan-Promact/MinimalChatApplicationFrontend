import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserLoginDto } from '../Dto/userLoginDto.model';
import { ResUserRegistrationDto } from '../Dto/resUserRegistrationDto.model';
import { EditMessageDto } from '../Dto/editMessageDto.model';
import { UserRegistrationDto } from '../Dto/userRegistrationDto.model';
import { MessageDto } from '../Dto/messageDto.model';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  baseUrl = "http://localhost:5012/";

  constructor(private http: HttpClient) { }

  getUsersAsync(): Observable<ResUserRegistrationDto> {
    let headers = new HttpHeaders().
      set("Authorization", `bearer ${localStorage.getItem('token')}`);
    return this.http.get<ResUserRegistrationDto>(this.baseUrl + "users", { headers });
  }

  loginUserAsync(userLoginDto: UserLoginDto) {
    return this.http.post(this.baseUrl + "login", userLoginDto);
  }
  registerUsersAsync(registerUserData: UserRegistrationDto) {
    return this.http.post(this.baseUrl + "register", registerUserData);
  }

  postMessageAsync(messageDto: MessageDto) {
    let headers = new HttpHeaders().
      set("Authorization", `bearer ${localStorage.getItem('token')}`);
    return this.http.post(this.baseUrl + "messages", messageDto, { headers });
  }

  updateMessageAsync(messageDto: EditMessageDto) {
    let headers = new HttpHeaders().
      set("Authorization", `bearer ${localStorage.getItem('token')}`);
    return this.http.put(this.baseUrl + "messages/id", messageDto, { headers });
  }

  deleteMessageAsync(id: string) {
    let headers = new HttpHeaders().
      set("Authorization", `bearer ${localStorage.getItem('token')}`)
    return this.http.delete(this.baseUrl + "messages/id", { headers });
  }

  getUserConversationHistory(user: any) {
    let headers = new HttpHeaders().
      set("Authorization", `bearer ${localStorage.getItem('token')}`)
    return this.http.get(this.baseUrl + "conversations/" + user, { headers })
  }

  getUserId(){
    return localStorage.getItem('userId');
  }
}
