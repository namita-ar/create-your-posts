import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }
  // GET -   https://jsonplaceholder.typicode.com/posts   (LIST)
  // PUT - https://jsonplaceholder.typicode.com/posts/{id}  (UPDATE)
  // PATCH- https://jsonplaceholder.typicode.com/posts/{id}  (UPDATE)
  // DELETE- https://jsonplaceholder.typicode.com/posts/{id}  (DELETE)
  // POST - https://jsonplaceholder.typicode.com/posts  (ADD)
  //  GET -   https://jsonplaceholder.typicode.com/posts{id}   (for fetching single post)  
  getAllPosts() :Observable<any>{
    return this.http.get<any>('posts')
  }
  getPostById(id){
    return this.http.get<any>(`posts/${id}`)
    
  }
  deletePost(id){
    return this.http.delete<any>(`posts/${id}`)
  }
  editPost(id,data){
    return this.http.put<any>(`posts/${id}`,{data})
  }
  createPost(data){
    return this.http.post<any>(`posts`,{data})
  }
}
