/*
 *  John Chiodo
 *  jchiodo@hawk.iit.edu
 *  ITMD462 - Assignment8 week12
 *  11/14/2017
 */

// Override some jshint warnings
// jshint multistr: true
// jshint node: true 

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should(); // jshint ignore:line
let expect = chai.expect;
chai.use(chaiHttp);
chai.use(require('chai-json-schema'));

/*
 * Test plan for assignment 8 
 */
var multiStr = '\nITMD462 Assignment 8 Test Plan  \n\
This test suite will test the RESTful API from Assignment 6 \n\n\
============================== \n\
===> Sunny Day test cases <=== \n\
============================== \n\n\
  TID001: Add 3 separate 3 users \n\
           POST /users \n\
  TID002: Add 2 reminders for each of the 3 users \n\
           POST /users/{userId}/reminders \n\
  TID003: Get user informatiin for first 3 users \n\
           GET /users/{userId} \n\
  TID004: Get first and second reminder from second user \n\
           GET /users/{userId}/reminders/{reminderId} \n\
  TID005: Get all reminders from third user \n\
           GET /users/{userId}/reminders \n\
  TID006: Delete first user and all reminders \n\
           DELETE /users/{userId} \n\
  TID007: Delete all reminders from second user \n\
           DELETE /users/{userId}/reminders \n\
  TID008: Delete first reminder from third user \n\
           DELETE /users/{userId}/reminders/{reminderId} \n\n\
======================================== \n\
===> Sunny Day Error Leg test cases <=== \n\
======================================== \n\n\
=>Error leg for route: GET /users/{userId} <= \n\n\
  TID009: Attempt to GET a user that does not exist \n\n\
=>Error legs for route: GET /users/{userId}/reminders <= \n\n\
  TID010: Attempt to GET reminders from a user that does not exist \n\
  TID011: Attempt to GET all reminders from a user that has no reminders \n\n\
=>Error legs for route: GET /users/{userId}/reminders/{reminderid} <=\n\n\
  TID012: Attempt to GET single reminder from a user that does not exist \n\
  TID013: Attempt to GET single reminder from a user that has no reminders \n\
  TID014: Attempt to GET single reminder from a user that does not have that reminder\n\n\
=>Error leg for route: POST /users <= \n\n\
  TID015: Attempt to add a user with empty body \n\n\
=>Error legs for route: POST /users/{userid}/reminders <= \n\n\
  TID016: Attempt to add a reminder to a user that does not exist \n\
  TID017: Attempt to add a user with empty body \n\n\
=>Error leg for route: DELETE /users/{userid} <= \n\n\
  TID018: Attempt to DELETE a user that does not exist \n\n\
=>Error leg for route: DELETE /users/{userid}/reminders <= \n\n\
  TID019: Attempt to DELETE all reminders from a user that does not exist \n\
  TID020: Attempt to DELETE all reminders from a user that does not have reminders \n\n\
=>Error leg for route: DELETE /users/{userid}/reminders/{reminderid} <= \n\n\
  TID021: Attempt to DELETE a single reminder from a user that does not exist \n\
  TID022: Attempt to DELETE a single reminder that does not have that reminder \n\
  TID023: Attempt to DELETE a single reminder from a user that does not have reminders \n\n\
=>Error leg for bad route: <= \n\n\
  TID024: Attempt an invalid route \n\n\n\
  ##### BEGIN TESTING ##### '; 
console.log(multiStr);

/*
 *  TID001: Add 3 separate 3 users POST /users
 *
 *  assersions:
 *  check for status = 200
 *  check returned userids
 * 
 */
describe('TID001: Add 3 users \n\troute: POST /users', () => {

  let user1 = { 'user': {'name': 'Jim Green', 'email': 'jgreen@gmail.com'}};
  let user2 = { 'user': {'name': 'Joe Blue', 'email': 'jblue@gmail.com'}}; 
  let user3 = { 'user': {'name': 'Jill Yellow', 'email': 'jyellow@gmail.com'}};

  it('Add user 1', (done) => {
      chai.request(server)
      .post('/users/')
      .send(user1)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('id').eql(1);
        done();
    });
   });
  

  it('Add user 2', (done) => {
      chai.request(server)
      .post('/users/')
      .send(user2)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('id').eql(2);
        done();
    });
  });
  
  it('Add user 3', (done) => {
      chai.request(server)
      .post('/users/')
      .send(user3)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('id').eql(3);
        done();
    });
  }); 
}); 

/*
 *  TID002: Add 2 reminders for each of the 3 users POST /users/{userId}/reminders
 *
 *  assersions:
 *  check for status = 200
 *  check for returned reminderids
 * 
 */
describe('TID002: Add 2 reminders to each of the 3 users \n\troute: POST /users/{userId}/reminders', () => {

  let userid1 = 1;
  let user1Rem1 = { 'reminder': {'title': 'eggs01',  'description': 'get eggs01 from store'}};
  let user1Rem2 = { 'reminder': {'title': 'eggs02',  'description': 'get eggs02 from store'}};
  let userid2 = 2;
  let user2Rem1 = { 'reminder': {'title': 'bread01',  'description': 'get bread01 from store'}};
  let user2Rem2 = { 'reminder': {'title': 'bread02',  'description': 'get bread02 from store'}};
  let userid3 = 3;
  let user3Rem1 = { 'reminder': {'title': 'milk01',  'description': 'get milk01 from store'}};
  let user3Rem2 = { 'reminder': {'title': 'milk02',  'description': 'get milk02 from store'}}; 
            
  it('Add reminder 1 to user 1', (done) => {
    chai.request(server)
      .post('/users/' + userid1 + '/reminders')
      .send(user1Rem1)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('reminderid').eql(1);
        done()
    });
  });   

  it('Add reminder 2 to user 1', (done) => {
    chai.request(server)
      .post('/users/' + userid1 + '/reminders')
      .send(user1Rem2)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('reminderid').eql(2);
        done();
    });
  });


  it('Add reminder 1 to user 2', (done) => {
    chai.request(server)
      .post('/users/' + userid2 + '/reminders')
      .send(user2Rem1)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('reminderid').eql(1);
        done();
    });  
  });

  it('Add reminder 2 to user 2', (done) => {
    chai.request(server)
      .post('/users/' + userid2 + '/reminders')
      .send(user2Rem2)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('reminderid').eql(2);
        done();
    });
  });

  it('Add reminder 1 to user 3', (done) => {
    chai.request(server)
      .post('/users/' + userid3 + '/reminders')
      .send(user3Rem1)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('reminderid').eql(1);
        done();
    });
  });

  it('Add reminder 2 to user 3', (done) => {
    chai.request(server)
      .post('/users/' + userid3 + '/reminders')
      .send(user3Rem2)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('reminderid').eql(2)
        done();
    });
  }); 
});

/*
 *  TID003: Get user information for first 3 users GET /users/{userId}
 *
 *  assersions:
 *  check for status = 200
 *  check that the returned json is valid and types match
 *  check for name field
 *  check for email field
 * 
 */
describe('TID003: Get user information for first 3 users \n\troute: GET /users/{userid}', () => {

  let userid1 = 1; 
  let userid2 = 2; 
  let userid3 = 3;

  var userSchema = {
    title: 'Assignment 6 user output schema',
    type: 'object',
    required: ['name', 'email'],
    properties: {
        name: {type: 'string'},
        email: {type:'string'}
    }
  }
  
  it('Get the name and email of user 1', (done) => {
    chai.request(server)
      .get('/users/' + userid1)
      .end((err, res) => {
        res.should.have.status(200);
        expect(res.body).to.be.jsonSchema(userSchema);
        res.body.should.have.property('name').eql('Jim Green');
        res.body.should.have.property('email').eql('jgreen@gmail.com');
        done();
    });
  });

  it('Get the name and email of user 2', (done) => {
    chai.request(server)
      .get('/users/' + userid2)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('name').eql('Joe Blue');
        res.body.should.have.property('email').eql('jblue@gmail.com');
        done();
    });
  });

  it('Get the name and email of user 3', (done) => {
    chai.request(server)
      .get('/users/' + userid3)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('name').eql('Jill Yellow');
        res.body.should.have.property('email').eql('jyellow@gmail.com');
        done();
    });
  });
});

/*
 *  TID004: Get first and second reminder from second user
 *            GET /users/{userId}/reminders/{reminderId}
 *
 *  assersions:
 *  check for status = 200
 *  check that the returned json is valid and types match
 *  check fields are of expected type.
 *  check for name and email fields
 * 
 */
describe('TID004: Get first and second reminder from user 2 \n\troute: GET /users/{userid}/reminders/{reminderid}', () => {

  let userid = 1; 
  let reminderid1 = 1;
  let reminderid2 = 2; 
    
  var reminderSchema = {
      title: 'Assignment 6 reminder output schema',
      type: 'object',
      required: ['title', 'description', 'created'],
      properties: {
          title: {type: 'string'},
          description: {type:'string'},
          created: {type: 'string'}
      }
  }

  it('Get first reminder from second user', (done) => {
    chai.request(server)
      .get('/users/' + userid + '/reminders/' + reminderid1)
      .end((err, res) => {
        res.should.have.status(200);
        expect(res.body).to.be.jsonSchema(reminderSchema);
        res.body.should.have.property('title').eql('eggs01');
        res.body.should.have.property('description').eql('get eggs01 from store');
        // created field implicitly tested as string in jsonSchema check
        done();
    });
  });


  it('Get second reminder from second user', (done) => {
    chai.request(server)
      .get('/users/' + userid + '/reminders/' + reminderid2)
      .end((err, res) => {
        res.should.have.status(200);
        expect(res.body).to.be.jsonSchema(reminderSchema);
        res.body.should.have.property('title').eql('eggs02');
        res.body.should.have.property('description').eql('get eggs02 from store');
        // created field implicitly tested as string in jsonSchema check
        done();
    });      
  });
});

/*
 *  TID005: Get all reminders from third user 
 *          GET /users/{userId}/reminders 
 *
 *  assersions:
 *  check for status = 200
 *  check for number of elements (reminders) in array.
 *    (reminders were verified in TID004)
 *
 */
describe('TID005: Get all reminders from user 3 \n\troute: GET /users/{userid}/reminders', () => {

  let userid = 3;
    
  it('Get all reminders from second user', (done) => {
    chai.request(server)
      .get('/users/' + userid + '/reminders/')
      .end((err, res) => {
        res.should.have.status(200);
        expect(res.body).to.have.length(2);
        done();
    });
  });
});

/* 
 * TID006: Delete first user and all reminders
 *         DELETE /users/{userId}
 *
 *  assersions:
 *  check for status = 204
 *
 */
describe('TID006: Delete first user and all reminders \n\troute: DELETE /users/{userid}', () => {

  let userid = 1;
    
  it('Delete first user and reminders', (done) => {
    chai.request(server)
      .delete('/users/' + userid)
      .end((err, res) => {
        res.should.have.status(204);
        done();
    });
  });
});

/* 
 * TID007: Delete all reminders from second user 
 *          DELETE /users/{userId}/reminders 
 *
 *  assersions:
 *  check for status = 204
 *
 */
describe('TID007: Delete all reminders from second user \n\troute: DELETE /users/{userid}/reminders', () => {

  let userid = 2;
    
  it('Delete all reminders from user 2', (done) => {
    chai.request(server)
      .delete('/users/' + userid + '/reminders')
      .end((err, res) => {
        res.should.have.status(204);
        done();
    });
  });
});

/* 
 * TID008: Delete first reminder from third user
 *          DELETE /users/{userId}/reminders/{reminderId}
 *
 *  assersions:
 *  check for status = 204
 *
 */
describe('TID008: Delete first reminder from third user \n\troute: DELETE /users/{userId}/reminders/{reminderId}', () => {

  let userid = 3;
  let reminderid = 1;

  it('Delete reminder 1 from user 3', (done) => {
    chai.request(server)
      .delete('/users/' + userid + '/reminders/' + reminderid)
      .end((err, res) => {
        res.should.have.status(204);
        done();
    });
  });
});

/*
 * TID009: Attempt to GET a user that does not exist
 *          GET /users/{userId}
 *
 *  assersions:
 *  check for status = 404
 *  check return string
 * 
 */
describe('TID009: Attempt to GET a user that does not exist \n\troute: GET /users/{userid}', () => {

  let userid1 = 1; 

  it('Attempt to get name and email from deleted user 1', (done) => {
    chai.request(server)
      .get('/users/' + userid1)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.equal('Sorry, userid 1 was not found');
        done();
    });
  });
});

/*
 * TID010: Attempt to GET reminders from a user that does not exist
 *          GET /users/{userId}/reminders
 *
 *  assersions:
 *  check for status = 404
 *  check return string
 * 
 */
describe('TID010: Attempt to GET all reminders from a user that does not exist \n\troute: GET /users/{userid}/reminders', () => {

  let userid = 1;
    
  it('Attempt to get all reminders from user 1 (user was deleted by TID006)', (done) => {
    chai.request(server)
      .get('/users/' + userid + '/reminders/')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.equal('Sorry, userid 1 was not found');
        done();
    });
  });
});

/*
 * TID011: Attempt to GET all reminders from a user that has no reminders
 *          GET /users/{userId}/reminders
 *
 *  assersions:
 *  check for status = 404
 *  check return string
 * 
 */
describe('TID011: Get all reminders from a user that has no reminders \n\troute: GET /users/{userid}/reminders', () => {

  let userid = 2;
    
  it('Attempt to get all reminders from user 2 (reminders were deleted by TID007)', (done) => {
    chai.request(server)
      .get('/users/' + userid + '/reminders/')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.equal('Sorry, userid 2 has no reminders');
        done();
    });
  });
});

/*
 * TID012: Attempot to GET single reminder from a user that does not exist
 *          GET /users/{userId}/reminders/{reminderId}
 *
 *  assersions:
 *  check for status = 404
 *  check return string
 * 
 */
describe('TID012: Get a reminders from a user that does not exist \n\troute: GET /users/{userid}/reminders/{reminderid}', () => {

  let userid = 1;
  let reminderid  = 1;
    
  it('Attempt to get reminder 1 from user 1 (user was deleted by TID006)', (done) => {
    chai.request(server)
      .get('/users/' + userid + '/reminders/' + reminderid)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.equal('Sorry, userid 1 was not found');
        done();
    });
  });
});

/*
 * TID013 Attempot to GET single reminder from a user that has no reminders n\
 *         GET /users/{userId}/reminders/{reminderId}
 *
 *  assersions:
 *  check for status = 404
 *  check return string
 * 
 */
describe('TID013: Get a reminders from a user that has no reminders \n\troute: GET /users/{userid}/reminders/{reminderid}', () => {

  let userid = 2;
  let reminderid  = 1;
    
  it('Attempt to get reminder 1 from user 2 (reminders were deleted by TID007)', (done) => {
    chai.request(server)
      .get('/users/' + userid + '/reminders/' + reminderid)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.equal('Sorry, userid 2 has no reminders');
        done();
    });
  });
});

/*
 * TID014 Attempot to GET single reminder from a user that does not have that reminder\n\
 *          GET /users/{userId}/reminders/{reminderId}
 *
 *  assersions:
 *  check for status = 404
 *  check return string
 * 
 */
describe('TID014: Get a reminders from a user that does not have that reminder \n\troute: GET /users/{userid}/reminders/{reminderid}', () => {

  let userid = 3;
  let reminderid  = 1;
    
  it('Attempt to get reminder 1 from user 3 (reminder 1 were deleted by TID008)', (done) => {
    chai.request(server)
      .get('/users/' + userid + '/reminders/' + reminderid)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.equal('Sorry, reminderid 1 was not found');
        done();
    });
  });
});

/*
 * TID015: Attempt to POST a user with empty body
 *          POST /users
 *
 *  assersions:
 *  check for status = 404
 *  check return string
 * 
 */
describe('TID015: Attempt add user with empty body \n\troute: POST /users', () => {

  let tmpUser = { };

  it('Attempt to add user', (done) => {
      chai.request(server)
      .post('/users/')
      .send(tmpUser)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.equal('Error: Data required for this operation');
        done();
    });
  });
});

/*
 * TID016: Attempt to add a reminder to a user that does not exist
 *          POST /users/{userid}/reminders
 *
 *  assersions:
 *  check for status = 400
 *  check return string
 * 
 */
describe('TID016: Attempt to add reminder to user that does not exist\n\troute: POST /users/{userid}/reminders', () => {

  let userid = 4;
  let user4Rem1 = { 'reminder': {'title': 'eggs01',  'description': 'get eggs01 from store'}};

  it('Attempt to add a reminder to user 4', (done) => {
      chai.request(server)
      .post('/users/' + userid + '/reminders')
      .send(user4Rem1)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.equal('Sorry, userid 4 was not found');
        done();
    });
  });
});

/*
 * TID017: Attempt to add a user with empty body
 *          POST /users/{userid}/reminders
 *
 *  assersions:
 *  check for status = 400
 *  check return string
 * 
 */
describe('TID017: Attempt add user 2 with empty body \n\troute: POST /users/{userid}/reminders', () => {

  let userid = 2;
  let user2Rem1 = { };

  it('Attempt to add reminder to user 2', (done) => {
      chai.request(server)
      .post('/users/' + userid + '/reminders')
      .send(user2Rem1)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.equal('Error: Data required for this operation');
        done();
    });
  });
});

/* 
 * TID018: Attempt to DELETE a user that does not exist
 *          DELETE /users/{userId}
 *
 *  assersions:
 *  check for status = 404
 *  check return string
 *
 */
describe('TID018: Attempt to DELETE a user that does not exist \n\troute: DELETE /users/{userid}', () => {

  let userid = 4;
    
  it('Delete user 4', (done) => {
    chai.request(server)
      .delete('/users/' + userid)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.equal('Sorry, userid 4 was not found');
        done();
    });
  });
});

/* 
 * TID019: Attempt to DELETE all reminders from a user that does not exist
 *          DELETE /users/{userId}/reminders
 *
 *  assersions:
 *  check for status = 404
 *  check return string
 *
 */
describe('TID019: Attempt to DELETE all reminders from a user that does not exist \n\troute: DELETE /users/{userid}/reminders', () => {

  let userid = 4;
      
  it('Delete user 4', (done) => {
    chai.request(server)
      .delete('/users/' + userid + '/reminders')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.equal('Sorry, userid 4 was not found');
        done();
    });
  });
});

/* 
 * TID020: Attempt to DELETE all reminders from a user that does not have reminders.
 *          DELETE /users/{userId}/reminders
 *
 * aa per requirements, not considered an error, just return 204
 *
 *  assersions:
 *  check for status = 204
 *
 */
describe('TID020: Attempt to DELETE all reminders from a user that does not have reminders \n\troute: DELETE /users/{userid}/reminders', () => {

  let userid = 2;
      
  it('Attempt to delete all reminders from user 2', (done) => {
    chai.request(server)
      .delete('/users/' + userid + '/reminders')
      .end((err, res) => {
        res.should.have.status(204);
        done();
    });
  });
});

/* 
 * TID021: Attempt to DELETE a single reminder from a user that does not exist.
 *          DELETE /users/{userId}/reminders/{remindersid}
 *
 *  assersions:
 *  check for status = 404
 *  check return string
 *
 */
describe('TID021: Attempt to DELETE a single reminder from a user that does not exist \n\troute: DELETE /users/{userid}/reminders/{reminderid}', () => {

  let userid = 4;
  let reminderid = 1;
      
  it('Attempt to delete reminder 1 from user 4', (done) => {
    chai.request(server)
      .delete('/users/' + userid + '/reminders/' + reminderid)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.equal('Sorry, userid 4 was not found');
        done();
    });
  });
});

/* 
 * TID022: Attempt to DELETE a single reminder that does not have that reminder.
 *          DELETE /users/{userId}/reminders/{remindersid}
 *
 *  assersions:
 *  check for status = 404
 *  check return string
 *
 */
describe('TID022: Attempt to DELETE a single reminder that does not have that reminder. \n\troute: DELETE /users/{userid}/reminders/{reminderid}', () => {

  let userid = 3;
  let reminderid = 8;
      
  it('Attempt to delete reminder 8 from user 3', (done) => {
    chai.request(server)
      .delete('/users/' + userid + '/reminders/' + reminderid)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.equal('Sorry, reminderid 8 was not found');
        done();
    });
  });
});

/* 
 * TID023: Attempt to DELETE a single reminder from a user that does not have reminders.
 *          DELETE /users/{userId}/reminders/{reminderid}
 *
 * aa per requirements, not considered an error, just return 204
 *
 *  assersions:
 *  check for status = 204
 *
 */
describe('TID023: Attempt to DELETE a single reminder from a user that does not have reminders. \n\troute: DELETE /users/{userid}/reminders/{reminderid}', () => {

  let userid = 2;
  let reminderid = 1;

  it('Attempt to delete reminders 1 from user 2', (done) => {
    chai.request(server)
      .delete('/users/' + userid + '/reminders/' + reminderid)
      .end((err, res) => {
        res.should.have.status(204);
        done();
    });
  });
}); 

/* 
 * TID024: Attempt an invalid route.
 *
 *
 *  assersions:
 *  check for status = 204
 *  check return string
 *
 */
describe('TID024: Attempt to access and invalid resource.', () => {
  it('Attempt an invalid route', (done) => {
    chai.request(server)
      .delete('/users1/')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.equal('Sorry, Can not find that resource.');
        done();
    });
  });
}); 
