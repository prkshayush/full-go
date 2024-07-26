package main

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Todo struct {
	ID        primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Completed bool               `json:"completed"`
	Body      string             `json:"body"`
}

var collection *mongo.Collection

func main() {

	error := godotenv.Load(".env")
	if error != nil {
		log.Fatal("Error loading .env file", error)
	}

	db_url := os.Getenv("MONGODB_URI")
	clientOptions := options.Client().ApplyURI(db_url)
	client, err := mongo.Connect(context.Background(), clientOptions)

	if err != nil {
		log.Fatal(err)
	}

	defer client.Disconnect(context.Background())
	// when main func is done, disconnect from the db client

	err = client.Ping(context.Background(), nil)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Connected to db")

	collection = (*mongo.Collection)(client.Database("full_go").Collection("todos"))

	app := fiber.New()

	app.Get("/api/todos", getTodos)
	app.Post("/api/todos", createTodos)
	app.Patch("/api/todos/:id", updateTodo)
	app.Delete("/api/todos/:id", deleteTodo)

	port := os.Getenv("PORT")
	if port == "" {
		port = "4000"
	}
	log.Fatal(app.Listen(":" + port))

}

func getTodos(c *fiber.Ctx) error {
	var todos []Todo

	cursor, err := collection.Find(context.Background(), bson.M{})
	if err != nil {
		log.Fatal(err)
	}

	defer cursor.Close(context.Background())
	// close the cursor when getTodos func is done
	// postpones the execution of a function until the surrounding function returns

	for cursor.Next(context.Background()) {
		var todo Todo
		if err := cursor.Decode(&todo); err != nil {
			log.Fatal(err)
		}
		todos = append(todos, todo)
	}

	if err := cursor.Err(); err != nil {
		return err
	}

	return c.JSON(todos)
}

func createTodos(c *fiber.Ctx) error {
	todo := new(Todo)

	if err := c.BodyParser(todo); err != nil {
		return err
	}

	if todo.Body == "" {
		return c.Status(404).JSON(fiber.Map{"error": "Body can't be empty"})
	}

	insert, err := collection.InsertOne(context.Background(), todo)
	if err != nil {
		return err
	}

	todo.ID = insert.InsertedID.(primitive.ObjectID)
	return c.Status(201).JSON(todo)
}

func updateTodo(c *fiber.Ctx) error {
	id := c.Params("id")
	// need to convert this string id into objectid
	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil{
		return c.Status(404).JSON(fiber.Map{"error": "invalid id"})
	}
	filter := bson.M{"_id": objectID}
	update := bson.M{"$set": bson.M{"completed": true}}
	//bson.M is used to filter data, if empty it will return all values

	_, err = collection.UpdateOne(context.Background(), filter, update)
	// _ because we are not using it
	if err != nil{
		return err
	}
	return c.Status(201).JSON(fiber.Map{"message": "Successfully updated"})
}

func deleteTodo(c *fiber.Ctx) error{
	id := c.Params("id")
	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return err
	}
	filter := bson.M{"_id":objectID}

	_, err = collection.DeleteOne(context.Background(), filter)

	if err != nil{
		return c.Status(404).JSON(fiber.Map{"message": "can't find anything with this id"})
	}

	return c.Status(201).JSON(fiber.Map{"message": "successfully deleted"})
}