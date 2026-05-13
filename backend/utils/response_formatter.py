from datetime import datetime


def success_response(data, message="Request successful"):
    return {
        "success": True,
        "timestamp": datetime.utcnow().isoformat(),
        "message": message,
        "data": data
    }


def error_response(message="Request failed"):
    return {
        "success": False,
        "timestamp": datetime.utcnow().isoformat(),
        "message": message
    }