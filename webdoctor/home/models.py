from django.db import models

# Create your models here.


class Home(models.Model):
    name = models.CharField(max_length=50)
    email = models.EmailField(max_length=50)
    paradigm = models.CharField(max_length=50)

    def __str__(self):
        return self.name
