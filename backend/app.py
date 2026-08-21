# Add messages.json handling
MESSAGES_FILE = os.path.join(BASE_DIR, "messages.json")

def get_messages():
    return _read_json(MESSAGES_FILE)

# Admin dashboard route — include messages
@app.route(ADMIN_URL + "/dashboard", methods=["GET"])
@admin_required
def admin_dashboard():
    return render_template(
        "admin_dashboard.html",
        pending=get_pending(),
        approved=get_approved(),
        messages=get_messages(),
        admin_url=ADMIN_URL,
    )

# API endpoint for single message
@app.route("/api/messages/<message_id>", methods=["GET"])
@admin_required
def get_message(message_id):
    messages = get_messages()
    target = next((m for m in messages if m["id"] == message_id), None)
    if target:
        return jsonify(target)
    return jsonify({"error": "Message not found"}), 404

# Admin logout
@app.route(ADMIN_URL + "/logout", methods=["POST"])
@admin_required
def admin_logout():
    session.pop("is_admin", None)
    return redirect(ADMIN_URL)