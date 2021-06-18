describe("Appointments", () => {
  beforeEach(() => {
    // Reset the database
    cy.request("GET", "/api/debug/reset");

    cy.visit("/");

    cy.contains("Monday");
  });

  it("should book an interview", () => {
    // Click Add in the first empty slot
    cy.get("[alt=Add]")
      .first()
      .click();

    // Enter student name and select an interviewer
    cy.get("[data-testid=student-name-input]")
      .type("Lydia Miller-Jones");
    cy.get('[alt="Sylvia Palmer"]')
      .click();
    
    // Save the appointment
    cy.contains("Save")
      .click();
    
    // Show booked appointments
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });
  
  it("should edit an interview", () => {
    // Click Edit on booked interview
    cy.get("[alt=Edit]")
    .click({force: true});   

    // Clear current student name and enter new student name then select an interviewer
    cy.get("[data-testid=student-name-input]")
      .clear()
      .type("Lydia Miller-Jones");
    cy.get("[alt='Tori Malcolm']")
      .click();
  
    // Save the appointment
    cy.contains("Save")
      .click();
    
    // Show booked appointments
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });

  it("should cancel an interview", () => {
    // Click Delete on booked interview
    cy.get("[alt=Delete]")
      .click({ force: true });
    
    // Confirm deletion
    cy.contains("Confirm").click();
  
    cy.contains("Deleting").should("exist");
    cy.contains("Deleting").should("not.exist");
  
    // Appointment no longer shows
    cy.contains(".appointment__card--show", "Archie Cohen")
      .should("not.exist");
  });
});
