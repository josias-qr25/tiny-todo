from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

todos = []

@app.route("/todos", methods=["GET", "POST"])
def handle_todos():
    if request.method == "POST":
        data = request.get_json()
        todos.append(data)
        return jsonify(data), 201
    return jsonify(todos)

@app.route("/todos/<int:todo_id>", methods=["DELETE"])
def delete_todo(todo_id):
    global todos
    todos = [t for t in todos if t["id"] != todo_id]
    return "", 204

@app.route("/todos/<int:todo_id>", methods=["PATCH"])
def update_todo(todo_id):
    data = request.get_json()
    for todo in todos:
        if todo["id"] == todo_id:
            todo["completed"] = data.get("completed", False)
            return jsonify(todo), 200
    return jsonify({"error": "Todo not found"}), 404

if __name__ == "__main__":
    app.run(debug=True)
