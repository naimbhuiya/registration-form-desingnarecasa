let _bhwdFuntons = {};
jQuery(function ($) {
  _bhwdFuntons.isValidEmail = function (field) {
    let emailValidation = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    // Get current input value
    let email = $(field).val();
    // console.log(email);

    // Remove invalid characters
    let sanitizedEmail = email.replace(
      /[^a-z0-9._-]+@[^a-z0-9.-]+\.[^a-z]{2,6}/g,
      ""
    );
    // If sanitized value is different, update input field
    // console.log();
    $(field).val(sanitizedEmail.toLowerCase());
    if (email !== sanitizedEmail) {
      $(field).val(sanitizedEmail);
      // console.log(sanitizedEmail);
    }
    // console.log(emailValidation.test(email));

    return emailValidation.test(email);
  };
  _bhwdFuntons.isValidPhone = function (field, i) {
    let phoneValidation = /^\+([1-9]\d{0,3})[ -]?(\d{6,14})$/;

    let countryCodes = {
      1: "United States / Canada",
      7: "Russia / Kazakhstan",
      20: "Egypt",
      27: "South Africa",
      30: "Greece",
      31: "Netherlands",
      32: "Belgium",
      33: "France",
      34: "Spain",
      36: "Hungary",
      39: "Italy",
      40: "Romania",
      41: "Switzerland",
      43: "Austria",
      44: "United Kingdom",
      45: "Denmark",
      46: "Sweden",
      47: "Norway",
      48: "Poland",
      49: "Germany",
      51: "Peru",
      52: "Mexico",
      53: "Cuba",
      54: "Argentina",
      55: "Brazil",
      56: "Chile",
      57: "Colombia",
      58: "Venezuela",
      60: "Malaysia",
      61: "Australia",
      62: "Indonesia",
      63: "Philippines",
      64: "New Zealand",
      65: "Singapore",
      66: "Thailand",
      81: "Japan",
      82: "South Korea",
      84: "Vietnam",
      86: "China",
      90: "Turkey",
      91: "India",
      92: "Pakistan",
      93: "Afghanistan",
      94: "Sri Lanka",
      95: "Myanmar",
      98: "Iran",
      880: "Bangladesh",
      971: "United Arab Emirates",
    };

    // Restrict input to only allow "+" at the start followed by numbers
    $(field).on("input", function () {
      let inputVal = $(this).val();
      if (!/^\+\d*$/.test(inputVal)) {
        $(this).val(inputVal.replace(/[^+\d]/g, "")); // Remove invalid characters
        return false;
      }
    });

    let countryCodeValidation = /^\+(\d{1,4})/;
    let phone = $(field).val().trim();
    let match = phone.match(countryCodeValidation);

    if ($(field).val().trim().length <= 1) {
      $(".details").eq(i).find("span").remove();
    }

    if (!match) return false; // Invalid country code, return false

    let countryCode = match[1]; // Extract country code
    let countryCheck = $("<span>")
      .addClass("bhwdInputFieldBadge")
      .text(countryCodes[countryCode] || "");

    let detailsElement = $(".details").eq(i);

    if (countryCodes[countryCode]) {
      // Remove existing countryCheck before appending a new one
      detailsElement.find(".bhwdInputFieldBadge").remove();
      detailsElement.append(countryCheck);
    } else {
      // Show an error message for missing country code

      detailsElement.find(".bhwdInputFieldBadge").remove();
      _bhwdFuntons.changeErrText(
        ".bhwdErrText",
        i,
        "At first enter country code"
      );
      return false;
    }

    // Display success message
    _bhwdFuntons.changeErrText(".bhwdErrText", i, "Your phone number is valid");
    return true;
  };
  _bhwdFuntons.isValidName = function (field) {
    let nameValidation = /^[a-zA-Z\s]+$/;
    // Get current input value
    let name = $(field).val();
    // Remove invalid characters
    let sanitizedName = name.replace(/[^a-zA-Z\s]/g, "");
    // If sanitized value is different, update input field
    if (name !== sanitizedName) {
      $(field).val(sanitizedName);
    }

    return nameValidation.test(name);
  };
  _bhwdFuntons.isValidUsername = function (field) {
    let userNameValidation = /^[a-zA-Z0-9]+$/;

    // Get current input value
    let inputValue = $(field).val();

    // Remove invalid characters
    let sanitizedValue = inputValue.replace(/[^a-zA-Z0-9]/g, "");

    $(field).val(sanitizedValue.toLowerCase());
    // If sanitized value is different, update input field
    if (inputValue !== sanitizedValue) {
      $(field).val(sanitizedValue);
    }

    return userNameValidation.test(sanitizedValue);
  };
  _bhwdFuntons.isValidForm = function (form) {
    let isValid = true;
    form.find("input").each(function () {
      let input = $(this);
      if (input.attr("required") && input.val() === "") {
        isValid = false;
        input.addClass("is-invalid");
      } else {
        input.removeClass("is-invalid");
      }
    });
  };

  _bhwdFuntons.isValidPassword = function (password) {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    //   console.log(password);
    //   console.log(regex.test($(password).val()));

    return regex.test($(password).val());
  };

  _bhwdFuntons.otpIsValid = function () {
    let $otpCheck = $(".bhwdFormFieldsData").filter("[type='otp-code']");
    let otpValidation = /^[A-Za-z0-9]{4,8}$/; // Allow 4 to 8 alphanumeric characters
    let _bhwdCheck = false;

    if ($otpCheck.length === 0) {
      console.warn("OTP field not found.");
      return false;
    }

    let otpValue = $otpCheck.val().trim();
    console.log("Your OTP is:", otpValue);

    if (otpValue.length >= 4 && otpValidation.test(otpValue)) {
      _bhwdCheck = true;
    } else {
      console.warn("Invalid OTP format.");
      _bhwdCheck = false;
    }

    return _bhwdCheck;
  };

  _bhwdFuntons.changeErrText = function (errElement, index, text) {
    $(errElement).eq(index).text(text);
  };

  _bhwdFuntons.bhwdformFunction = function (form) {
    _bhwdFuntons.isValidFormField = false;
    $(`#${form} input`).each(function (i, el) {
      switch ($(this).attr("type")) {
        case "email":
          _bhwdFuntons.isValidFormField = _bhwdFuntons.isValidEmail(this)
            ? true
            : false;
          $(this).on("input", function () {
            if (!_bhwdFuntons.isValidEmail(this)) {
              $(this).addClass("is-invalid");
              _bhwdFuntons.changeErrText(
                ".bhwdErrText",
                i,
                "Your Email is invalid"
              );
            } else {
              $(this).removeClass("is-invalid");
              _bhwdFuntons.changeErrText(
                ".bhwdErrText",
                i,
                "Your Email is valid"
              );
            }
          });
          break;
        case "tel":
          $(this).on("input", function () {
            _bhwdFuntons.isValidPhone(this, i);
          });
          break;
        case "text":
          _bhwdFuntons.isValidFormField = _bhwdFuntons.isValidName(this)
            ? true
            : false;
          $(this).on("input", function () {
            if (!_bhwdFuntons.isValidName(this)) {
              $(this).addClass("is-invalid");
              _bhwdFuntons.changeErrText(
                ".bhwdErrText",
                i,
                "Please enter a valid name"
              );
            } else {
              $(this).removeClass("is-invalid");
              _bhwdFuntons.changeErrText(
                ".bhwdErrText",
                i,
                "Your name is valid"
              );
            }
            // console.log(i);
          });
          break;
        case "username":
          _bhwdFuntons.isValidFormField = _bhwdFuntons.isValidUsername(this)
            ? true
            : false;
          $(this).on("input", function () {
            if (!_bhwdFuntons.isValidUsername(this)) {
              $(this).addClass("is-invalid");
              _bhwdFuntons.changeErrText(
                ".bhwdErrText",
                i,
                "Your username is invalid"
              );
            } else {
              $(this).removeClass("is-invalid");
              _bhwdFuntons.changeErrText(
                ".bhwdErrText",
                i,
                "Verify your username"
              );
              $(".bhwdErrText")
                .eq(i)
                .addClass("bhwdCheckValidateUserName")
                .text("Verify your username");
              bhwdVerifyUsername(this);
            }
          });
          break;
        case "password":
          _bhwdFuntons.isValidFormField = _bhwdFuntons.isValidPassword(this)
            ? true
            : false;
          $(this).on("input", function () {
            if (!_bhwdFuntons.isValidPassword(this)) {
              _bhwdFuntons.changeErrText(
                ".bhwdErrText",
                i,
                $(this).attr("type-data") === "conf-password" &&
                  !_bhwdFuntons.bhwdPassWordMatch("bhwd_registation_form")
                  ? "Password not matched"
                  : "Password is invalid"
              );
            } else {
              _bhwdFuntons.changeErrText(
                ".bhwdErrText",
                i,
                $(this).attr("type-data") === "conf-password" &&
                  _bhwdFuntons.bhwdPassWordMatch("bhwd_registation_form")
                  ? "Password matched"
                  : "Password is valid"
              );
            }
          });

          break;
        case "date":
          $(this).val(new Date("Mar 04 1990").toISOString().split("T")[0]); // Set default value (YYYY-MM-DD format)
          _bhwdFuntons.changeErrText(
            ".bhwdErrText",
            i,
            "Selected date: " + $(this).val()
          );

          $(this)
            .off("change")
            .on("change", function () {
              if ($(this).prop("required")) {
                // Check if the field is required
                let selectedDate = new Date(this.value);
                if (!isNaN(selectedDate.getTime())) {
                  // Ensure valid date
                  console.log(selectedDate);
                  _bhwdFuntons.changeErrText(
                    ".bhwdErrText",
                    i,
                    "Selected date: " + selectedDate
                  );
                } else {
                  console.log("Invalid date selected");
                  _bhwdFuntons.changeErrText(
                    ".bhwdErrText",
                    i,
                    "Invalid date selected"
                  );
                }
              }
            });
          break;
      }
    });

    return _bhwdFuntons.isValidFormField;
  };

  _bhwdFuntons.bhwdPassWordMatch = function (form) {
    let passwordField = $(`#${form} input[type-data="password"]`);
    let confPasswordField = $(`#${form} input[type-data="conf-password"]`);

    let password = passwordField.val();
    let confPassword = confPasswordField.val();

    if (password !== "" && confPassword !== "" && password !== confPassword) {
      confPasswordField.addClass("is-invalid");
      return false;
    }

    confPasswordField.removeClass("is-invalid");
    return true;

    // $(passwordField)
    //   .add(confPasswordField)
    //   .on("input", function () {

    //   });
  };

  // function bhwdFunctionToastMessage() {}
  _bhwdFuntons.bhwdToastMessage = function (is, msg) {
    switch (is) {
      case "warn":
        bhwdToast("Warning", msg, "#fa983a");
        break;
      case "err":
        bhwdToast("Error", msg, "#e74c3c");
        break;
      case "success":
        bhwdToast("Success", msg, "#2ecc71");
        break;
      default:
        bhwdToast("Info", msg, "#3498db");
        break;
    }
  };

  _bhwdFuntons.bhwdformFunction("bhwd_registation_form");
  // console.log(_bhwdFuntons.bhwdformFunction("bhwd_registation_form"));

  /**
   * bhwdTooltip
   * @param {string} element
   */

  /**
   * Password tooltip
   * @param {*} element
   */
  _bhwdFuntons.bhwdPasswordToolpit = function (element) {
    let toolpit = $("<div>");
    toolpit.addClass(
      "bhwd-tooltip shadow-lg rounded position-fixed bg-light p-2"
    );
    toolpit.css({
      width: "500px",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    });
    let closeButton = $("<button>");
    closeButton.addClass("btn-close");
    closeButton.attr("type", "button");

    let bhwdPassList = $("<ul>");
    bhwdPassList.addClass("list-group list-group-flush");
    let passList = [
      "At least 8 characters",
      "At least 1 uppercase",
      "At least 1 lowercase",
      "At least 1 number",
      "At least 1 special character",
    ];
    passList.forEach((el) => {
      let li = $("<li>");
      li.addClass("list-group-item");
      li.text(el);
      bhwdPassList.append(li);
    });
    toolpit.append(closeButton);
    toolpit.append(bhwdPassList);

    $("body").append(toolpit);
    closeButton.css({
      position: "absolute",
      top: "10px",
      right: "10px",
      zIndex: "1000",
    });
    closeButton.on("click", function () {
      toolpit.remove();
    });
    $("body").on("click", function (e) {
      if (!$(e.target).closest(".bhwd-tooltip").length) {
        toolpit.remove();
      }
    });
  };
  _bhwdFuntons.bhwdTooltip = function (element) {
    $(element).each(function () {
      $(this).on("click", function () {
        let toolpitType = $(this).attr("data");
        switch (toolpitType) {
          case "password":
            _bhwdFuntons.bhwdPasswordToolpit();
            break;
        }
      });
    });
  };

  _bhwdFuntons.bhwdTooltip(".bhwd-tooltip");

  function bhwdFormDataSubmit() {
    $("#bhwdFormDataSubmit")
      .off("click")
      .on("click", function (e) {
        e.preventDefault(); // Prevent form submission if inside a form
        // alert(1);
        console.log(_bhwdFuntons.otpIsValid());

        if (_bhwdFuntons.bhwdformFunction("bhwd_registation_form")) {
          let formData = $(".bhwdFormFieldsData")
            .map(function () {
              return $(this).val().trim(); // Trim unnecessary spaces
            })
            .get(); // Convert jQuery object to array
          _bhwdFuntons.bhwdToastMessage(
            "success",
            "You registration is complate."
          );
          console.log(formData); // Logs an array of values
        } else {
          _bhwdFuntons.bhwdToastMessage("warn", "Fill up the form correctly");
        }
      });
  }

  // Initialize the function
  bhwdFormDataSubmit();

  /**
   * bhwd verify username
   * @param {string} element
   */

  function bhwdVerifyUsername(el) {
    let bhwdVerifyUsername = $(".bhwdCheckValidateUserName");
    if (bhwdVerifyUsername) {
      $(bhwdVerifyUsername).on("click", function () {
        // console.log(counter++);

        if (_bhwdFuntons.isValidUsername(el)) {
          let bhwdUsername = $(".bhwdFormFieldsData[type='username']");
          let username = bhwdUsername.val();
          console.log(username);
        }
      });
    }
  }

  function bhwdToast(is, msg, color) {
    // Check if a toast container already exists; if not, create one
    let $toastContainer = $(".toast-container");
    if ($toastContainer.length === 0) {
      $toastContainer = $("<div>")
        .addClass("toast-container position-fixed bottom-0 end-0 p-3")
        .attr("id", "bhwdToastContainer");
      $("body").append($toastContainer);
    }

    // Create toast element
    let $toast = $("<div>")
      .addClass("toast show align-items-center text-white border-0")
      .attr({
        role: "alert",
        "aria-live": "assertive",
        "aria-atomic": "true",
        style: `background: ${color};`,
      });

    // Create toast header
    let $toastHeader = $("<div>").addClass("toast-header text-dark text-light");
    let $strong = $("<strong>").addClass("me-auto").text(is);
    let $closeBtn = $("<button>").addClass("btn-close bhwdCloseToastMsg").attr({
      type: "button",
      "data-bs-dismiss": "toast",
      "aria-label": "Close",
    });

    // Append elements to header
    $toastHeader.append($strong, $closeBtn);

    // Create toast body
    let $toastBody = $("<div>").addClass("toast-body").text(msg);

    // Append header and body to toast
    $toast.append($toastHeader, $toastBody);

    // Append toast to container
    $toastContainer.append($toast);

    // Close toast on button click
    $closeBtn.on("click", function () {
      $toast.fadeOut(300, function () {
        $(this).remove();
      });
    });

    // Auto-remove after 5 seconds
    setTimeout(function () {
      $toast.remove();
    }, 5000);
  }
});
