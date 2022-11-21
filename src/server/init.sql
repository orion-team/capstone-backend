CREATE TABLE IF NOT EXISTS recipe (
	id binary(16) NOT NULL,
	uri varchar(500) NOT NULL,
	label varchar(50) NOT NULL,
	image varchar(255) NOT NULL,
	source varchar(255) NOT NULL,
	url varchar(255) NOT NULL,
	ingredientsJSON blob,
	ingredientsLinesJSON blob,
	PRIMARY KEY (id)
);

CREATE TABLE if not exists user (
	id binary(16) NOT NULL,
    email varchar(255) NOT NULL,
    name varchar(255) NOT NULL,
    picture varchar(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE if not exists favorited_item (
    id binary(16) NOT NULL,
    recipe_id binary(16) NOT NULL,
    user_id binary(16) NOT NULL,
    favorited_at date NOT NULL,
    FOREIGN KEY (recipe_id) REFERENCES recipe(id),
    FOREIGN KEY (user_id) REFERENCES user(id),
    PRIMARY KEY (id)
);