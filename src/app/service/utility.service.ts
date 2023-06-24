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

  constructor(private http: HttpClient) { }
  baseUrl = "http://localhost:5012/"

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
    return this.http.post(this.baseUrl + "messages", messageDto);
  }

  updateMessageAsync(messageDto: EditMessageDto) {
    return this.http.put(this.baseUrl + "messages/id", messageDto);
  }

  //Edit this with query params
  // deleteMessageAsync(id: string) {
  //   let headers = new HttpHeaders().
  //     set("Authorization", `bearer ${localStorage.getItem('token')}`);
  //   return this.http.delete(this.baseUrl + "messages/id", id, { headers });
  // }

  getUserConversationHistory() {
    let headers = new HttpHeaders().
      set("Authorization", `bearer ${localStorage.getItem('token')}`);
    return this.http.get(this.baseUrl + "messages/id", { headers })
  }
}
