# Generated by Django 4.2.3 on 2023-08-05 07:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("myapi", "0005_alter_waitlist_emails"),
    ]

    operations = [
        migrations.AlterField(
            model_name="waitlist",
            name="emails",
            field=models.ManyToManyField(blank=True, to="myapi.email"),
        ),
    ]
