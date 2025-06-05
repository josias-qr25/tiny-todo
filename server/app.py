from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

todos = []

@app.route("/todos", methods=["GET", "POST"])
def handle_todos():
    if request.method == "POST":
        data = request.get._json()
        todo.append(data)
        return jsonify(data), 201
    return jsonify(todos)

@app.route("/todos/<int:todo_id>", methods=["DELETE"])
def delete_todo(todo_id):
    global todos
    todos = [t for t in todos if t["id"] != todo_id]
    return "", 204

if __name__ == "__main__":
    app.run(debug=True)
