from flask import Flask, render_template, request, redirect, jsonify

app = Flask(__name__)
tasks = []

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/tasks', methods=['GET'])
def get_tasks():
    return jsonify(tasks)

@app.route('/add_task', methods=['POST'])
def add_task():
    task_content = request.json.get('content')
    if task_content:
        new_task = {"id": len(tasks) + 1, "content": task_content, "completed": False}
        tasks.append(new_task)
        return jsonify(new_task), 201
    return jsonify({"error": "Task content is required"}), 400

@app.route('/update_task/<int:task_id>', methods=['PUT'])
def update_task(task_id):
    for task in tasks:
        if task["id"] == task_id:
            task["completed"] = not task["completed"]
            return jsonify(task), 200
    return jsonify({"error": "Task not found"}), 404

@app.route('/delete_task/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    global tasks
    tasks = [task for task in tasks if task["id"] != task_id]
    return jsonify({"result": "Task deleted"}), 200

if __name__ == '__main__':
    app.run(debug=True)
import random

def get_random_color():
    return "#{:06x}".format(random.randint(0, 0xFFFFFF))

@app.route('/add_task', methods=['POST'])
def add_task():
    data = request.get_json()
    new_task = {
        "id": len(tasks) + 1,
        "content": data['content'],
        "completed": False,
        "color": get_random_color() 
    }
    tasks.append(new_task)
    return jsonify(new_task)
