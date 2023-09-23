

export let registration = `
CREATE TABLE IF NOT EXISTS registrations(
  user_id INT AUTO_INCREMENT, 
  user_first_name VARCHAR(225) NOT NULL,
  user_last_name VARCHAR(225) NOT NULL,
  user_name VARCHAR(225) NOT NULL,
  user_email VARCHAR(225) NOT NULL,
  user_password VARCHAR(255) NOT NULL,
  user_role VARCHAR(255) NOT NULL,
  user_OTP varchar(255),
  PRIMARY KEY (user_id)
)`;

export let profiles = `CREATE TABLE if not exists profiles(
user_profile_id int auto_increment, 
user_id int not null, 
user_first_name varchar(225) not null,
user_last_name varchar(225) not null,
PRIMARY KEY (user_profile_id)
)`;

export let questions = `CREATE TABLE if not exists questions(
  question_id int auto_increment,
  user_id int not null, 
  questions varchar(225) not null, 
  question_description varchar(225) not null,
  time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (question_id)
)`;
export let answers = `CREATE TABLE if not exists answers(
  answer_id int auto_increment,
  user_id int not null,
  user_name text not null,
  user_email varchar(255) not null,
  question_id INT NOT NULL,
  answer varchar(225) not null,
  time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (answer_id)
  )`;


