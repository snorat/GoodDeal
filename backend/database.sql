CREATE TABLE car_brand (
  `car_brand_id` INT NOT NULL AUTO_INCREMENT,
  `car_brand_name` VARCHAR(50) NOT NULL,
   PRIMARY KEY (`car_brand_id`)
   )ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

CREATE TABLE car_model (
  `car_model_id` INT NOT NULL AUTO_INCREMENT,
  `car_brand_id` INT NOT NULL,
  `car_model_name` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`car_model_id`),

  CONSTRAINT `fk_carbrand_carmodel`
    FOREIGN KEY (`car_brand_id`)
    REFERENCES car_brand (`car_brand_id`)
  )ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;


CREATE TABLE car_type (
  `car_type_id` INT NOT NULL AUTO_INCREMENT,
  `car_type_name` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`car_type_id`))ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;



CREATE TABLE user (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `firstname` VARCHAR(80) NOT NULL,
  `lastname` VARCHAR(80) NOT NULL,
  `email` VARCHAR(100) UNIQUE NOT NULL,
  `hashedPassword` VARCHAR(100) NOT NULL,
    PRIMARY KEY (`user_id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

  CREATE TABLE announce (
  `announce_id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `title` VARCHAR(100) NOT NULL,
  `price` INT NOT NULL,
  `year` INT NOT NULL,
  `car_brand_id` INT NOT NULL,
  `car_model_id` INT NOT NULL,
 `motorisation` VARCHAR(20) NOT NULL,
  `kilometer` INT NOT NULL,
  `transmission` VARCHAR(20) NOT NULL,
  `car_type_id` INT NOT NULL,
    `power` INT NOT NULL,
  `state` VARCHAR(10) NOT NULL,
  `license` VARCHAR(20) NOT NULL,
  `description` TEXT(500) NOT NULL,
   `contact` VARCHAR(50) NOT NULL,
  `city` VARCHAR(50)  NOT NULL,
  `postalcode` VARCHAR(50)  NOT NULL,
  PRIMARY KEY (`announce_id`),

  CONSTRAINT `fk_user_announce`
  FOREIGN KEY (`user_id`)
  REFERENCES user(`user_id`),

  CONSTRAINT `fk_carbrand_announce`
  FOREIGN KEY (`car_brand_id`)
  REFERENCES car_brand(`car_brand_id`),

  CONSTRAINT `fk_carmodel_announce`
  FOREIGN KEY (`car_model_id`)
  REFERENCES car_model(`car_model_id`),

  CONSTRAINT `fk_cartype_announce`
  FOREIGN KEY (`car_type_id`)
  REFERENCES car_type(`car_type_id`)
  )ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

CREATE TABLE images (
  `image_id` INT NOT NULL AUTO_INCREMENT,
  `announce_id` INT NOT NULL,
  `image_1` VARCHAR(255),
  `image_2` VARCHAR(255),
  `image_3` VARCHAR(255),
  `image_4` VARCHAR(255),
  

  PRIMARY KEY (`image_id`),

  CONSTRAINT `fk_announce_images`
  FOREIGN KEY (`announce_id`)
  REFERENCES announce(`announce_id`))ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;


  CREATE TABLE favorite (
  `favorite_id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `announce_id` INT NOT NULL,
  PRIMARY KEY (`favorite_id`),

  CONSTRAINT `fk_user_favorite`
    FOREIGN KEY (`user_id`)
    REFERENCES user (`user_id`)
    ,
  CONSTRAINT `fk_announce_favorite`
    FOREIGN KEY (`announce_id`)
    REFERENCES announce (`announce_id`)
   )ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

   CREATE TABLE messages (
  `message_id` INT NOT NULL AUTO_INCREMENT,
  `announce_id` INT NOT NULL,
  `sender_user_id` INT NOT NULL,
  `receiver_user_id` INT NOT NULL,
  `content` TEXT NOT NULL,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`message_id`),

  FOREIGN KEY (sender_user_id) REFERENCES user(user_id),
  FOREIGN KEY (receiver_user_id) REFERENCES user(user_id),

   CONSTRAINT `fk_announce_message`
    FOREIGN KEY (`announce_id`)
    REFERENCES announce (`announce_id`)
    )ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

CREATE TABLE newsletter (
  `newsletter_id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(50) UNIQUE NOT NULL,
   PRIMARY KEY (`newsletter_id`)
     )ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

INSERT INTO car_brand (`car_brand_name`) VALUES ('VOLKSWAGEN');
INSERT INTO car_brand (`car_brand_name`) VALUES ('MERCEDES-BENZ');
INSERT INTO car_brand (`car_brand_name`) VALUES ('BMW');
INSERT INTO car_brand (`car_brand_name`) VALUES ('PEUGEOT');
INSERT INTO car_brand (`car_brand_name`) VALUES ('AUDI');
INSERT INTO car_brand (`car_brand_name`) VALUES ('RENAULT');
INSERT INTO car_brand (`car_brand_name`) VALUES ('OPEL');
INSERT INTO car_brand (`car_brand_name`) VALUES ('DACIA');
INSERT INTO car_brand (`car_brand_name`) VALUES ('FORD');



INSERT INTO car_model (`car_brand_id`, `car_model_name`) VALUES ('1', 'Golf');
INSERT INTO car_model (`car_brand_id`, `car_model_name`) VALUES ('1', 'Polo');
INSERT INTO car_model (`car_brand_id`, `car_model_name`) VALUES ('1', 'Up!');
INSERT INTO car_model (`car_brand_id`, `car_model_name`) VALUES ('1', 'Tiguan');
INSERT INTO car_model (`car_brand_id`, `car_model_name`) VALUES ('1', 'Passat');
INSERT INTO car_model (`car_brand_id`, `car_model_name`) VALUES ('1', 'T-Roc');
INSERT INTO car_model (`car_brand_id`, `car_model_name`) VALUES ('2', 'C-Klasse');
INSERT INTO car_model (`car_brand_id`, `car_model_name`) VALUES ('2', 'A-Klasse');
INSERT INTO car_model (`car_brand_id`, `car_model_name`) VALUES ('2', 'E-Klasse');
INSERT INTO car_model (`car_brand_id`, `car_model_name`) VALUES ('2', 'CLA');
INSERT INTO car_model (`car_brand_id`, `car_model_name`) VALUES ('2', 'B-Klasse');
INSERT INTO car_model (`car_brand_id`, `car_model_name`) VALUES ('2', 'S-Klasse');
INSERT INTO car_model (`car_brand_id`, `car_model_name`) VALUES ('3', '3-serie');
INSERT INTO car_model (`car_brand_id`, `car_model_name`) VALUES ('3', '5-serie');
INSERT INTO car_model (`car_brand_id`, `car_model_name`) VALUES ('3', '1-serie');
INSERT INTO car_model (`car_brand_id`, `car_model_name`) VALUES ('3', 'X5');
INSERT INTO car_model (`car_brand_id`, `car_model_name`) VALUES ('3', 'X1');
INSERT INTO car_model (`car_brand_id`, `car_model_name`) VALUES ('3', 'X3');
INSERT INTO car_model (`car_brand_id`, `car_model_name`) VALUES ('4', '208');
INSERT INTO car_model (`car_brand_id`, `car_model_name`) VALUES ('4', '308');
INSERT INTO car_model (`car_brand_id`, `car_model_name`) VALUES ('4', '2008');
INSERT INTO car_model (`car_brand_id`, `car_model_name`) VALUES ('4', '108');
INSERT INTO car_model (`car_brand_id`, `car_model_name`) VALUES ('4', '107');
INSERT INTO car_model (`car_brand_id`, `car_model_name`) VALUES ('4', '207');
INSERT INTO car_model (`car_brand_id`, `car_model_name`) VALUES ('5', 'A3');
INSERT INTO car_model (`car_brand_id`, `car_model_name`) VALUES ('5', 'A4');
INSERT INTO car_model (`car_brand_id`, `car_model_name`) VALUES ('5', 'A6');
INSERT INTO car_model (`car_brand_id`, `car_model_name`) VALUES ('5', 'A1');
INSERT INTO car_model (`car_brand_id`, `car_model_name`) VALUES ('5', 'A5');
INSERT INTO car_model (`car_brand_id`, `car_model_name`) VALUES ('5', 'Q3');
INSERT INTO car_model (`car_brand_id`, `car_model_name`) VALUES ('6', 'Clio'),('6', 'Mégane'),('6', 'Captur'),('6', 'Twingo'),('6', 'Kangoo'),('6', 'Scénic');
INSERT INTO car_model (`car_brand_id`, `car_model_name`) VALUES ('7', 'Corsa'),('7', 'Astra'),('7', 'Mokka'),('7', 'Crossland X'),('7', 'Meriva'),('7', 'Insignia');
INSERT INTO car_model (`car_brand_id`, `car_model_name`) VALUES ('8', 'Duster'),('8', 'Sandero'),('8', 'Logan MCV'),('8', 'Sandero Stepway'),('8', 'Spring'),('8', 'Lodgy');
INSERT INTO car_model (`car_brand_id`, `car_model_name`) VALUES ('9', 'Focus'), ('9', 'Fiesta'), ('9', 'Kuga'), ('9', 'Ka'), ('9', 'Puma'), ('9', 'C-Max');

INSERT INTO car_type (`car_type_name`) VALUES ('Citadines');
INSERT INTO car_type (`car_type_name`) VALUES ('Berlines');
INSERT INTO car_type (`car_type_name`) VALUES ('4x4, suv, crossover');
INSERT INTO car_type (`car_type_name`) VALUES ('Sans permis');
INSERT INTO car_type (`car_type_name`) VALUES ('Breaks');
INSERT INTO car_type (`car_type_name`) VALUES ('Cabriolets');
INSERT INTO car_type (`car_type_name`) VALUES ('Coupés');


INSERT INTO user (`firstname`, `lastname`, `email`, `hashedPassword`) VALUES ('SALA', 'sala', 'sala@gmail.com', '$argon2id$v=19$m=65536,t=5,p=1$HR/lNvZ6zWRH4ObyGrlMtw$7wAqMGtpdJaSFYCmTPnV+gTaX7dwy0KC4cXhVyC5/Ks');
INSERT INTO user (`firstname`, `lastname`, `email`, `hashedPassword`) VALUES ('fatma', 'itchir', 'fatmaitchir@gmail.com', '$argon2id$v=19$m=65536,t=5,p=1$lnatfSXFrBSkZWyIiUpuVg$jmgjxwAIsYzB3rHP4IQMCOeBnBUVcn8HZPTCP8/WKZw');
INSERT INTO user (`firstname`, `lastname`, `email`, `hashedPassword`) VALUES ('saima', 'NORAT', 'sAIMA@gmail.com', '$argon2id$v=19$m=65536,t=5,p=1$HR/lNvZ6zWRH4ObyGrlMtw$7wAqMGtpdJaSFYCmTPnV+gTaX7dwy0KC4cXhVyC5/Ks');
INSERT INTO user (`firstname`, `lastname`, `email`, `hashedPassword`) VALUES ('OTHIEL', 'KANAGARAJ', 'OTHIEL@gmail.com', '$argon2id$v=19$m=65536,t=5,p=1$lnatfSXFrBSkZWyIiUpuVg$jmgjxwAIsYzB3rHP4IQMCOeBnBUVcn8HZPTCP8/WKZw');
INSERT INTO user (`firstname`, `lastname`, `email`, `hashedPassword`) VALUES ('KEVIN', 'PESET', 'KEVIN@gmail.com', '$argon2id$v=19$m=65536,t=5,p=1$lnatfSXFrBSkZWyIiUpuVg$jmgjxwAIsYzB3rHP4IQMCOeBnBUVcn8HZPTCP8/WKZw');
INSERT INTO user (`firstname`, `lastname`, `email`, `hashedPassword`) VALUES ('kkk', 'KKK', 'KKK@gmail.com', '$argon2id$v=19$m=65536,t=5,p=1$lnatfSXFrBSkZWyIiUpuVg$jmgjxwAIsYzB3rHP4IQMCOeBnBUVcn8HZPTCP8/WKZw');
INSERT INTO user (`firstname`, `lastname`, `email`, `hashedPassword`) VALUES ('jjj', 'JJJ', 'JJJ@gmail.com', '$argon2id$v=19$m=65536,t=5,p=1$lnatfSXFrBSkZWyIiUpuVg$jmgjxwAIsYzB3rHP4IQMCOeBnBUVcn8HZPTCP8/WKZw');


INSERT INTO announce (`user_id`, `title`, `price`, `year`,`car_brand_id`, `car_model_id`, `motorisation`, `kilometer`, `transmission`, `car_type_id`,`power`, `state`, `license`, `description`,`contact` , `city`,`postalcode`) VALUES ('1', 'A vendre magnifique 207.. super occasion', '21000', '2000', '4', '24', 'Diesel', '50000','Manuelle', '1', '75', 'Non', 'Avec permis', 'Voiture en bon etat.  Jamais accidentée. Non fumeur','435345345','PARIS','75014');
INSERT INTO announce (`user_id`, `title`, `price`, `year`,`car_brand_id`, `car_model_id`, `motorisation`, `kilometer`, `transmission`, `car_type_id`,`power`, `state`, `license`, `description` ,`contact`, `city`,`postalcode`) VALUES ('2', 'Dernier Mercedes amg', '25000', '2022', '2', '7', 'Petrol', '50000', 'Automatic', '2', '200', 'Non', 'Avec permis', 'Voiture en bon etat','435345345','PARIS','75014');
INSERT INTO announce (`user_id`, `title`, `price`, `year`, `car_brand_id`, `car_model_id`, `motorisation`, `kilometer`, `transmission`, `car_type_id`, `power`, `state`,`license`, `description`, `contact`, `city`,`postalcode`) VALUES ('3', '2022 Audi A4 Premium', '19000', '2022', '5', '26', 'Diesel',' 15000', 'Automatic', '3', '220', 'Non', 'Avec permis', 'Brand new Audi A4 Premium with low mileage.', '12345678', 'PARIS','75014');
INSERT INTO announce (`user_id`, `title`, `price`, `year`, `car_brand_id`, `car_model_id`, `motorisation`, `kilometer`, `transmission`, `car_type_id`, `power`, `state`, `license`, `description`, `contact`, `city`,`postalcode`) VALUES ('4','2021 Volkswagen Polo TSI', '20000', '2021', '1', '2', 'Diesel','18000', 'Automatic', '4', '110', 'yes', 'Avec permis','Well-maintained Volkswagen Polo TSI for sale.', '78833032', 'PARIS', '75014');
INSERT INTO announce (`user_id`, `title`, `price`, `year`,`car_brand_id`, `car_model_id`, `motorisation`, `kilometer`, `transmission`, `car_type_id`,`power`, `state`, `license`, `description`,`contact` , `city`,`postalcode`) VALUES ('5', 'A vendre magnifique 207.. super occasion', '20000', '2000', '4', '24', 'Diesel', '50000','Manuelle', '5', '75', 'Non', 'Sans permis', 'Voiture en bon etat.  Jamais accidentée. Non fumeur','435345345','PARIS','75014');
INSERT INTO announce (`user_id`, `title`, `price`, `year`,`car_brand_id`, `car_model_id`, `motorisation`, `kilometer`, `transmission`, `car_type_id`,`power`, `state`, `license`, `description` ,`contact`, `city`,`postalcode`) VALUES ('6', 'BENZ A3', '31000', '2022', '2', '7', 'Petrol', '50000', 'Automatic', '6', '200', 'Non', 'Avec permis', 'Voiture en bon etat','435345345','PARIS','75014');
INSERT INTO announce (`user_id`, `title`, `price`, `year`,`car_brand_id`, `car_model_id`, `motorisation`, `kilometer`, `transmission`, `car_type_id`,`power`, `state`, `license`, `description` ,`contact`, `city`,`postalcode`) VALUES ('7', 'OPEL', '10000', '2022', '7', '37', 'Diesel', '50000', 'Automatic', '7', '200', 'Non', 'Avec permis', 'Voiture en bon etat','435345345','PARIS','75014');

INSERT INTO images (`announce_id`,`image_1`, `image_2`, `image_3`, `image_4`) 
VALUES ( '1',
  'announce-b0967ebd-5237-43e3-b33a-3811cfb18de8.webp',
  'announce-1e1dd694-a0c4-4c04-b431-79db38fa3c60.jpeg',
  'announce-1e1dd694-a0c4-4c04-b431-79db38fa3c60.jpeg',
  'announce-1e1dd694-a0c4-4c04-b431-79db38fa3c60.jpeg'
);
INSERT INTO images (`announce_id`,`image_1`, `image_2`, `image_3`, `image_4`) 
VALUES ( '2',
  'announce-206fce8e-a430-4b40-97d4-713c829f47fd.jpeg',
  'announce-1e1dd694-a0c4-4c04-b431-79db38fa3c60.jpeg',
  'announce-206fce8e-a430-4b40-97d4-713c829f47fd.jpeg',
  'announce-206fce8e-a430-4b40-97d4-713c829f47fd.jpeg'
);
INSERT INTO images (`announce_id`,`image_1`, `image_2`, `image_3`, `image_4`) 
VALUES ( '3',
  'announce-30468443-a374-4cfd-b025-46b34be5e067.jpeg',
  'audi.jpeg',
  'audi.jpeg',
  'audi.jpeg'
);
INSERT INTO images (`announce_id`,`image_1`, `image_2`, `image_3`, `image_4`) 
VALUES ( '4',
  'announce-fda953b3-f2d0-4b61-af9e-93aa03f2e0f6.webp',
  'announce-63512bd5-5daf-44d2-9261-3a92f098c53c.webp',
  'announce-63512bd5-5daf-44d2-9261-3a92f098c53c.webp',
  'announce-63512bd5-5daf-44d2-9261-3a92f098c53c.webp'
);
INSERT INTO images (`announce_id`,`image_1`, `image_2`, `image_3`, `image_4`) 
VALUES ( '5',
  'breaks1.jpg',
  'breaks2.jpg',
  'announce-63512bd5-5daf-44d2-9261-3a92f098c53c.webp',
  'announce-63512bd5-5daf-44d2-9261-3a92f098c53c.webp'
);
INSERT INTO images (`announce_id`,`image_1`, `image_2`, `image_3`, `image_4`) 
VALUES ( '6',
  'cabriolet1.jpg',
  'cabriolet2.jpg',
  'cabriolet2.jpg',
  'cabriolet2.jpg'
);
INSERT INTO images (`announce_id`,`image_1`, `image_2`, `image_3`, `image_4`) 
VALUES ( '7',
  'coupe1.jpg',
  'coupe2.jpg',
  'coupe2.jpg',
  'coupe2.jpg'
);

-- INSERT INTO messages (announce_id, sender_user_id, receiver_user_id, content) 
-- VALUES ('1', '2', '1', 'Coucou Sala');



-- INSERT INTO `goodeal`.`newsletter` (`email`) VALUES ('othiel.leith@gmail.com');
-- INSERT INTO `goodeal`.`newsletter` (`email`) VALUES ('saima.narat@gmail.com');
-- INSERT INTO `goodeal`.`newsletter` (`email`) VALUES ('salamata@gmail.com');
-- INSERT INTO `goodeal`.`newsletter` (`email`) VALUES ('fatmaitchir@gmail.com');


-- INSERT INTO `goodeal`.`favorite` (`user_id`, `announce_id`) VALUES ('1', '1');

