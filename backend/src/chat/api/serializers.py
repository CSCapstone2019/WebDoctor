from rest_framework import serializers
from patients.models import Chat, Schedule, Scheduler
from chat.views import get_user_contact, get_user_scheduler





# Handling many to many relationship
class ContactSerializer(serializers.StringRelatedField):
    def to_internal_value(self, value):
        return value

# Handling many to many relationship
class SchedulerSerializer(serializers.StringRelatedField):
    def to_internal_value(self, value):
        return value

class ChatSerializer(serializers.ModelSerializer):
    participants = ContactSerializer(many=True)

    class Meta:
        model = Chat
        fields = ('chat_id', 'messages', 'participants')
        read_only = ('chat_id')

    def create(self, validated_data):
        print("---SERIALIZER -> CHAT SERIALIZER - VALIDATED DATA: ",validated_data)
        participants = validated_data.pop('participants')
        chat = Chat()
        chat.save()
        for username in participants:
            contact = get_user_contact(username)
            chat.participants.add(contact)
        chat.save()
        return chat

class ScheduleSerializer(serializers.ModelSerializer):
    participants = SchedulerSerializer(many=True)

    class Meta:
        model = Schedule
        fields = ('schedule_id', 'appointment_date', 'appointment_time','message','participants')
        read_only = ('schedule_id')

    def create(self, validated_data):
        print("---SERIALIZER -> SCHEDULE SERIALIZER - VALIDATED DATA: ",validated_data)
        participants = validated_data.pop('participants')
        date = validated_data.pop('appointment_date')
        time = validated_data.pop('appointment_time')
        message = validated_data.pop('message')

        schedule = Schedule()
        schedule.save()
        schedule.appointment_date = date
        schedule.appointment_time = time
        schedule.message = message
        schedule.save()
        for username in participants:
            scheduler = get_user_scheduler(username)
            schedule.participants.add(scheduler)
        schedule.save()
        return schedule
        
# do in python shell to see how to serialize data

# python manage.py shell
# from chat.models import Chat
# from chat.api.serializers import ChatSerializer
# chat = Chat.objects.get(id=1)
# s = ChatSerializer(instance=chat)
# s
# s.data