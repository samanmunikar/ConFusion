import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback, ContactType } from '../shared/feedback';
import { flyInOut } from '../animations/app.animation';
import { FeedbackService } from '../services/feedback.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut()
  ]
})
export class ContactComponent implements OnInit {

  @ViewChild('fform') feedbackFormDirective;
  feedbackForm: FormGroup;
  feedback: Feedback;
  feedbackCopy: Feedback;
  contactType = ContactType;

  errmess: string;
  isLoading = false;
  isSubmitted = false;
  private timer: Observable<any>;
  private subscription: Subscription;
  
  formErrors = {
    'firstname': '',
    'lastname': '',
    'telnum': '',
    'email': ''
  };

  validationMessage = {
    'firstname': {
      'required':      'First Name is required.',
      'minlength':     'First Name must be at least 2 characters long.',
      'maxlength':     'FirstName cannot be more than 25 characters long.'
    },
    'lastname': {
      'required':      'Last Name is required.',
      'minlength':     'Last Name must be at least 2 characters long.',
      'maxlength':     'Last Name cannot be more than 25 characters long.'
    },
    'telnum': {
      'required':      'Tel. number is required.',
      'pattern':       'Tel. number must contain only numbers.'
    },
    'email': {
      'required':      'Email is required.',
      'email':         'Email not in valid format.'
    },
  };

  constructor(private fb: FormBuilder, private feedbackService: FeedbackService) { 
    this.createForm();
  }

  ngOnInit() {
  }

  createForm(): void {
    this.feedbackForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      telnum: ['', [Validators.required, Validators.pattern] ],
      email: ['', [Validators.required, Validators.email] ],
      agree: false,
      contacttype: 'None',
      message: ''
    });

    this.feedbackForm.valueChanges
        .subscribe(data => this.onValueChanged(data));
    
    this.onValueChanged(); // reset form validation messages
  }

  onValueChanged(data?: any){
    if (!this.feedbackForm) {return;}
    const form = this.feedbackForm;
    for (const field in this.formErrors){
      if (this.formErrors.hasOwnProperty(field)){
        // clear previous error message if any
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid){
          const message = this.validationMessage[field];
          for (const key in control.errors){
            if (control.errors.hasOwnProperty(key)){
              this.formErrors[field] += message[key] + ' ';
            }
          }
        }
      }
    }
  }

  onSubmit() {
    this.feedbackCopy = this.feedbackForm.value;
    // console.log(this.feedbackCopy);
    this.isLoading = true;
    this.feedbackService.submitFeedback(this.feedbackCopy)
      .subscribe(feedback => {
        this.isLoading = false;
        this.isSubmitted = true;
        this.timer = Observable.timer(5000);
        this.subscription = this.timer.subscribe(() => {
          this.isSubmitted = false;
        })
        console.log(this.feedbackCopy);
        this.feedback = feedback;
        this.feedbackCopy = feedback;
      },
      errmess => {
        this.feedback = null;
        this.feedbackCopy = null;
        this.errmess = <any> errmess;
      });
    this.feedbackForm.reset({
      firstname: '',
      lastname: '',
      telnum: '',
      email: '',
      agree: false,
      contacttype: 'None',
      message: ''
    });
    this.feedbackFormDirective.resetForm();
  }
}
