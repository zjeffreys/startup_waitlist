# Generated by Django 4.2.3 on 2023-08-16 05:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("myapi", "0007_alter_email_email_address"),
    ]

    operations = [
        migrations.AlterField(
            model_name="waitlist",
            name="name",
            field=models.CharField(max_length=100, unique=True),
        ),
    ]
