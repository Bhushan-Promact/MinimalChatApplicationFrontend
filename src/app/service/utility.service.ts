import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { UserLoginDto } from '../Dto/userLoginDto.model';
import { ResUserRegistrationDto } from '../Dto/resUserRegistrationDto.model';
import { EditMessageDto } from '../Dto/editMessageDto.model';
import { UserRegistrationDto } from '../Dto/userRegistrationDto.model';
import { MessageDto } from '../Dto/messageDto.model';
import { SortingDto } from '../Dto/sortingDto.Model';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  baseUrl = "http://localhost:5012/";
  sorting = new Subject();

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
    let testMesage = messageDto.TextMessage;
    return this.http.put(this.baseUrl + "messages/" + messageDto.MessageId + "?testMesage=" + testMesage, {}, { headers });
  }

  deleteMessageAsync(id: string) {
    let headers = new HttpHeaders().
      set("Authorization", `bearer ${localStorage.getItem('token')}`)
    return this.http.delete(this.baseUrl + "messages/" + id, { headers });
  }

  getUserConversationHistory(user: any, sortMessage: any) {
    let headers = new HttpHeaders().
      set("Authorization", `bearer ${localStorage.getItem('token')}`)
    return this.http.get(`${this.baseUrl}conversations/${user}?Before=${sortMessage.Before}
    &Count=${sortMessage.Count} &Sort=${sortMessage.Sort}`, { headers })
  }
  //(this.baseUrl + "conversations/" + user + "?Before", { headers })
  getUserId() {
    return localStorage.getItem('userId');
  }
}
