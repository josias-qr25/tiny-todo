from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)

if os.path.exists("todos.json"):
    with open("todos.json", "r") as f:
        todos = json.load(f)
else:
    todos = []

def save_todos():
    with open("todos.json", "w") as f:
        json.dump(todos, f)

@app.route("/todos", methods=["GET"])
def get_todos():
    return jsonify(todos)

@app.route("/todos", methods=["POST"])
def add_todo():
    data = request.json
    new_todo = {
        "id": max([todo["id"] for todo in todos], default=0) + 1,
        "title": data.get("title", ""),
        "completed": False
    }
    todos.append(new_todo)
    save_todos()
    return jsonify(new_todo), 201

@app.route("/todos/<int:todo_id>", methods=["PATCH"])
def toggle_todo(todo_id):
    for todo in todos:
        if todo["id"] == todo_id:
            todo["completed"] = not todo["completed"]
            save_todos()
            return jsonify(todo)
    return jsonify({"error": "Todo not found"}), 404

@app.route("/todos/<int:todo_id>", methods=["DELETE"])
def delete_todo(todo_id):
    global todos
    todos = [todo for todo in todos if todo["id"] != todo_id]
    save_todos()
    return '', 204

if __name__ == "__main__":
    app.run(debug=True)
