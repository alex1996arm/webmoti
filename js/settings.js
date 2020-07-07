const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var setStudentTimeInput = document.getElementById("set-student-input");
var teacherChangeEmailInput = document.getElementById("teacher-change-email-input");
var teacherChangeRetypeInput = document.getElementById("teacher-retype-email-input");
var teacherEmailError = document.getElementById("teacher-change-email-error");
var teacherRetypeEmailError = document.getElementById("teacher-change-retype-email-error");
var setStudentError = document.getElementById("set-student-error");
const settingsTabs = document.querySelectorAll(".settings-tab");
let currentSettingsTab = settingsTabs[0].id;
// Settings tabs
var settingsEmailTab = document.getElementById("settings-email-tab");
var settingsTimeTab = document.getElementById("settings-teacher-tab");
var settingsNotifTab = document.getElementById("settings-notif-tab");
var settingsTimeBody = document.getElementById("teacher-settings-body");
var settingsEmailBody = document.getElementById("email-settings-body");
var settingsNotifBody = document.getElementById("notifications-settings-body");

var setStudentSaveButton = document.getElementById(
  "set-student-time-save-button"
);

/**
 * Function that shows dynamically an error message
 * if correct input not in range
 */
setStudentTimeInput.addEventListener("input", () => {
  if (setStudentTimeInput.value < 10 || setStudentTimeInput.value > 60) {
    alert("Please enter a value between 10-60");}
});
/**
 * Function that is called when user is typing to change target email
 */
teacherChangeEmailInput.addEventListener("keyup", () => {
  // Things to display:
  // - whether a proper email format
  // - whether the target email and target retype email match
  if (regexEmail.test(teacherChangeEmailInput.value.toLowerCase())) {
    if (teacherChangeEmailInput.value == teacherChangeRetypeInput.value) {
      // Same email and proper format
      teacherEmailError.innerHTML = "";
      teacherRetypeEmailError.innerHTML = "";
    } else {
      // Different emails proper format
      teacherEmailError.innerHTML = "Emails not matching";
    }
  } else {
    // Improper email format and not same
    teacherEmailError.innerHTML = "Email not proper format";
  }
});

/**
 * Same as above but for the retype email
 */
teacherChangeRetypeInput.addEventListener("keyup", () => {
  if (regexEmail.test(teacherChangeRetypeInput.value.toLowerCase())) {
    if (teacherChangeEmailInput.value == teacherChangeRetypeInput.value) {
      // Same email and proper format
      teacherEmailError.innerHTML = "";
      teacherRetypeEmailError.innerHTML = "";
    } else {
      // Different emails proper format
      teacherRetypeEmailError.innerHTML = "Emails not matching";
    }
  } else {
    // Improper email format
    teacherRetypeEmailError.innerHTML = "Email not proper format";
  }
});

// Function dynamically updates settings tab based on user click
settingsTabs.forEach(element => {
  element.addEventListener("click", () => {
    if (currentSettingsTab != element.id) {
      document.getElementById(currentSettingsTab).classList.remove("settings-tab-selected");
      // sets currentSettingsTabBody to the body id for the respective tab
      let currentSettingsTabBody = currentSettingsTab.slice(0,-3)+"body";
      let newSettingsTabBody = element.id.slice(0,-3)+"body";
      // changes display of tabs accordingly
      document.getElementById(currentSettingsTabBody).style.display = "none";
      currentSettingsTab = element.id;
      element.classList.add("settings-tab-selected");
      document.getElementById(newSettingsTabBody).style.display ="flex";
    }
  });
})

// ClockPicker initialization
var settings_timepicker_input = $('#settings-timepicker').clockpicker({
    placement: 'right',
    align: 'left',
    autoclose: true,
    'default': '00:00',
});

// Slider-Input box synchronization
let set_notification_frequency_slider = document.getElementById("set-notification-frequency-slider");
let set_notification_frequency = document.getElementById("set-notification-frequency");
set_notification_frequency.value = set_notification_frequency_slider.value;

set_notification_frequency_slider.addEventListener("click", () => {
  set_notification_frequency.value = set_notification_frequency_slider.value;
});
set_notification_frequency.addEventListener("input", () => {
  if(set_notification_frequency.value<6 && set_notification_frequency.value>0) {set_notification_frequency_slider.value = set_notification_frequency.value;}
  else{alert("Please enter a number between 1 and 5");};
});