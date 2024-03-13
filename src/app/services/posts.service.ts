import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
// import * as firebase from '@angular/fire';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private afs : AngularFirestore) { }

  loadFeatured(){
    return this.afs.collection('post',ref => ref.where('isFeatured', '==', true).limit(4)).snapshotChanges().pipe(
      map(action => {
        return action.map( a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, data }
        })
      })
    )
  }  

  loadLatest(){
    return this.afs.collection('post',ref => ref.orderBy('createdAt')).snapshotChanges().pipe(
      map(action => {
        return action.map( a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, data }
        })
      })
    )
  }  

  loadCategoryPosts ( categoryId : any){
    return this.afs.collection('post',ref => ref.where('category.categoryId', '==' , categoryId).limit(4)).snapshotChanges().pipe(
      map(action => {
        return action.map( a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, data }
        })
      })
    )
  }  

  loadOnePost( postId: any){
   return this.afs.doc(`post/${postId}`).valueChanges();
  }

  loadSimilarPost( cardId: any){
    return this.afs.collection('post',ref => ref.where('category.categoryId', '==' , cardId).limit(4)).snapshotChanges().pipe(
      map(action => {
        return action.map( a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, data }
        })
      })
    )
  }

  // countViews( postId ) {
  //   const viewsCount = {
  //     views : firebase
  //   }

  //   this.afs.doc(`post/${postId}`).update();
  // }
}
