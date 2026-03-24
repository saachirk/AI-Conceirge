def get_recommendations(user_profile):
    experience = user_profile.get("experience", "beginner")

    if experience == "beginner":
        return [
            "ET Prime - Beginner Guides",
            "Mutual Funds",
            "Savings Plans"
        ]
    else:
        return [
            "Stock Market Tools",
            "ET Markets Pro",
            "Advanced Analysis"
        ]