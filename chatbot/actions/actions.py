
import requests
from typing import Any, Dict, List
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
from rasa_sdk.events import SlotSet

class ActionShowCart(Action):
    def name(self) -> str:
        return "action_show_cart"

    def run(self, dispatcher, tracker, domain):
        user_id = 1
        try:
            cart = requests.get(f"http://localhost:3000/users/{user_id}").json().get("cart", [])
        except:
            dispatcher.utter_message(text="Unable to retrieve your cart.")
            return []

        if not cart:
            dispatcher.utter_message(text="Your cart is empty.")
            return []

        msg = "Your cart contains:\n"
        for pet in cart:
            msg += f"- {pet['name']} ({pet['species']}, ${pet['price']})\n"
        dispatcher.utter_message(text=msg.strip())
        return []

class ActionCancelReservation(Action):
    def name(self) -> str:
        return "action_cancel_reservation"

    def run(self, dispatcher, tracker, domain):
        user_id = 1
        pet_name = tracker.get_slot("pet_name")
        user = requests.get(f"http://localhost:3000/users/{user_id}").json()
        cart = user.get("cart", [])
        updated_cart = [p for p in cart if p["name"].lower() != pet_name.lower()]

        if len(updated_cart) == len(cart):
            dispatcher.utter_message(text=f"No reservation found for '{pet_name}'.")
            return []

        requests.patch(f"http://localhost:3000/users/{user_id}", json={"cart": updated_cart})
        dispatcher.utter_message(text=f"Removed '{pet_name}' from your cart.")
        return []

class ActionRatePet(Action):
    def name(self) -> str:
        return "action_rate_pet"

    def run(self, dispatcher, tracker, domain):
        pet_name = tracker.get_slot("pet_name")
        rating = tracker.get_slot("rating")

        if not pet_name or rating is None:
            dispatcher.utter_message(text="Please provide a pet name and rating.")
            return []

        pets = requests.get("http://localhost:3000/pets").json()
        for pet in pets:
            if pet["name"].lower() == pet_name.lower():
                updated_reviews = pet.get("reviews", []) + [f"{rating} stars"]
                requests.patch(f"http://localhost:3000/pets/{pet['id']}", json={"reviews": updated_reviews})
                dispatcher.utter_message(text=f"Thanks for rating {pet_name}!")
                return []

        dispatcher.utter_message(text=f"I couldn't find a pet named {pet_name}.")
        return []
