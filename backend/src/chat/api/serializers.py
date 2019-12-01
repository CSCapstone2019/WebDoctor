from rest_framework import serializers
from patients.models import Chat, Schedule, Scheduler, Uploader, Report
from chat.views import get_user_contact, get_user_scheduler, get_user_uploader





# Handling many to many relationship
class ContactSerializer(serializers.StringRelatedField):
    def to_internal_value(self, value):
        return value

# Handling many to many relationship
class SchedulerSerializer(serializers.StringRelatedField):
    def to_internal_value(self, value):
        return value

# Handling many to many relationship        
class UploaderSerializer(serializers.StringRelatedField):
    def to_internal_value(self, value):
        return value



# SERIALIZER
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

class ReportSerializer(serializers.ModelSerializer):
    participants = UploaderSerializer(many=True)

    class Meta:
        model = Report
        fields = ('report_id', 'title', 'pdf','participants')
        read_only = ('report_id')

    def create(self, validated_data):
        print("---SERIALIZER -> REPORT SERIALIZER - VALIDATED DATA: ",validated_data)
        participants = validated_data.pop('participants')
        title = validated_data.pop('title')
        pdf = validated_data.pop('pdf')

        report = Report()
        report.save()
        report.appointment_date = date
        report.appointment_time = time
        report.message = message
        report.save()
        for username in participants:
            uploader = get_user_uploader(username)
            report.participants.add(uploader)
        report.save()
        return report  


# do in python shell to see how to serialize data

# python manage.py shell
# from chat.models import Chat
# from chat.api.serializers import ChatSerializer
# chat = Chat.objects.get(id=1)
# s = ChatSerializer(instance=chat)
# s
# s.data