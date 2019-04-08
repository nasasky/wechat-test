SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS  `test`;
CREATE TABLE `test` (
  `filename` tinytext,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userliuyan` text NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `lyurl` text,
  `user` varchar(32) NOT NULL DEFAULT 'admin',
  `psw` varchar(32) NOT NULL DEFAULT 'kejiweixun',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;

SET FOREIGN_KEY_CHECKS = 1;

