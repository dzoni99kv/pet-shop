from typing import Any, Dict, List
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
from rasa_sdk.events import SlotSet

class ActionConfirmReservation(Action):
    def name(self) -> str:
        return "action_confirm_reservation"

    def run(self, dispatcher, tracker, domain):
        pet_name = tracker.get_slot("pet_name")
        if not pet_name:
            dispatcher.utter_message(text="Which pet would you like to reserve?")
            return []

        cart = tracker.get_slot("cart") or []
        if pet_name in cart:
            dispatcher.utter_message(text=f"{pet_name} is already in your cart.")
        else:
            cart.append(pet_name)
            dispatcher.utter_message(text=f"{pet_name} has been added to your cart.")

        return [SlotSet("cart", cart)]

class ActionShowCart(Action):
    def name(self) -> str:
        return "action_show_cart"

    def run(self, dispatcher, tracker, domain):
        cart = tracker.get_slot("cart") or []
        if not cart:
            dispatcher.utter_message(text="Your cart is empty.")
        else:
            pet_list = ", ".join(cart)
            dispatcher.utter_message(text=f"Your cart contains: {pet_list}")
        return []

class ActionCancelReservation(Action):
    def name(self) -> str:
        return "action_cancel_reservation"

    def run(self, dispatcher, tracker, domain):
        pet_name = tracker.get_slot("pet_name")
        cart = tracker.get_slot("cart") or []

        if pet_name and pet_name in cart:
            cart.remove(pet_name)
            dispatcher.utter_message(text=f"{pet_name} has been removed from your cart.")
        else:
            dispatcher.utter_message(text=f"{pet_name} was not found in your cart.")

        return [SlotSet("cart", cart)]
class ActionSearchPet(Action):
    def name(self) -> str:
        return "action_search_pet"

    def run(self, dispatcher: CollectingDispatcher, tracker: Tracker, domain: Dict[str, Any]) -> List[Dict[str, Any]]:
        dispatcher.utter_message(text="Here are some of our popular pets: Luna, Max, Charlie.")
        return []