from django.db import models


class Patient(models.Model):
    SEXES = (
        ('F', 'Female'),
        ('M', 'Male'),
    )

    patient_id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    street = models.CharField(max_length=50)
    city = models.CharField(max_length=50)
    zipcode = models.CharField(max_length=5)
    email = models.EmailField(max_length=50)
    phone = models.CharField(max_length=10)
    dob = models.DateField()
    sex = models.CharField(max_length=1, choices=SEXES)
    new_patient_date = models.DateTimeField(auto_now_add=True)

    def full_name(self):
        return '%s %s' % (self.first_name, self.last_name)

    def __str__(self):
        return '%s the patient' % (self.full_name())


class Insurance(models.Model):
    insurance_id = models.AutoField(primary_key=True)
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    insurance_company = models.CharField(max_length=50)
    plan_name = models.CharField(max_length=50)
    group_number = models.CharField(max_length=50)
    insurance_id_number = models.CharField(max_length=50)

    def __str__(self):
        return '%s the insurance' % (self.insurance_company)
