import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent implements OnInit{

  postData: any;
  similarPostArray: any;

  constructor(private route: ActivatedRoute,private postService: PostsService){}

  ngOnInit(): void {

    this.route.params.subscribe(val =>{
      console.log(val['id'])
      this.postService.loadOnePost(val['id']).subscribe(post =>{
        console.log(JSON.stringify(post))
        console.log(post)
       this.postData = post ;
       this.loadSimilar(this.postData.category.categoryId);
      })
    })
    
  }

  loadSimilar(cardId: any){
    this.postService.loadSimilarPost(cardId).subscribe( post => {
      this.similarPostArray = post;
    })
  }

}
