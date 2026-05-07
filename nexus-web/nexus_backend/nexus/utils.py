import json
import urllib.request
import urllib.error
import threading

def emit_socket_event(room, event, payload):
    """
    Sends a webhook to the Next.js socket server to emit a real-time event.
    Runs asynchronously in a thread to prevent blocking the Django view.
    """
    url = 'http://localhost:3000/api/internal/socket'
    data = {
        'room': room,
        'event': event,
        'payload': payload
    }
    
    def send_request():
        try:
            req = urllib.request.Request(url, method='POST')
            req.add_header('Content-Type', 'application/json')
            jsondata = json.dumps(data).encode('utf-8')
            with urllib.request.urlopen(req, data=jsondata, timeout=2) as response:
                pass # Successfully emitted
        except Exception as e:
            print(f"Failed to emit socket event: {e}")

    thread = threading.Thread(target=send_request)
    thread.start()
