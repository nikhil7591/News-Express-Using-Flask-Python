from flask import Flask, render_template, request, redirect, url_for, flash,session,jsonify
import json
import os

app = Flask(__name__)
app.secret_key = 'your_secret_key'

# JSON file to store user data
USERS_FILE = 'users.json'
def load_users():
    users = {}
    try:
        if os.path.exists(USERS_FILE) and os.path.getsize(USERS_FILE) > 0:
            with open(USERS_FILE, 'r') as file:
                users = json.load(file)
    except FileNotFoundError:
        print("File not found")
    except json.JSONDecodeError as e:
        print("JSON decode error:", e)
    return users

# Function to save user data to JSON file
def save_users(users):
    try:
        with open(USERS_FILE, 'w') as file:
            json.dump(users, file, indent=4)
    except Exception as e:
        print("Error saving users:", e)

# Function to check if a user exists in the JSON file
def save_users_queries(query):
      try:
        with open('queries.json', 'a+') as file:
            json.dump(query, file)
            file.write('\n')  # Add a newline for readability
      except Exception as e:
        print("Error saving queries:", e)

# all html files call this function
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/index.html')
def home_index():
    return render_template('index.html')

@app.route('/aboutus.html')
def about_us():
    return render_template('aboutus.html')

# for sign user login
@app.route('/singup.html', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        users = load_users()
        email = request.form['email']
        password = request.form['password']
        confirm_password = request.form['confirm_password']
        if email in users:
          return jsonify({"message": "Email already exists!!"}),202
        else:
            if password == confirm_password:
              users[email] = {'password': password}
              save_users(users)  
              return jsonify({"message": "Sign Up successfully!"}), 201
            else:
              return jsonify({"message": "Password and confirm password do not match!!"})
    return render_template('signup.html')

@app.route('/login.html', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        users = load_users()
        email = request.form['email']
        password = request.form['password']
        if email in users and users[email]['password'] == password:
          session['email'] = email 
          return jsonify({"message": "login successfully!"}), 201
        else:
          return jsonify({"message": "not successfully!"}), 200
    return render_template('login.html')

@app.route('/logout')
def logout():
    session.pop('email', None)
    session.pop(session.get('email', '') + '_history', None)
    flash('Logged out successfully!', 'success')
    return redirect(url_for('index'))

#for contact_us 
@app.route('/contactus.html', methods=['GET', 'POST'])
def contact_us():
    if request.method == 'POST':
        name = request.form['name']
        email = request.form['email']
        message = request.form['message']

        # Construct the query object
        query = {
            'name': name,
            'email': email,
            'message': message
        }
        # Append the query to the JSON file
        save_users_queries(query)
        return jsonify({"message": "Message sent successfully!"}), 201
    return render_template('contactus.html')

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8080, debug=True)