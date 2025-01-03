# Document Revision History

Review the recent changes to this book.

## 2024-09-16
- Updated for Swift 6.
- Added the preconcurrency section with information about migrating to strict concurrency checking.
- Added the Specifying the Error Type section with information about throwing errors of a specific type.
- Updated the Macro-Expansion Expression section, now that any macro can be used as a default value for a parameter.
- Added information about package-level access to the Access Control chapter.

## 2024-03-05
- Updated for Swift 5.10.
- Added information about nested protocols to the Delegation section.
- Added deprecation information in the UIApplicationMain and NSApplicationMain sections.

## 2023-12-11
- Updated for Swift 5.9.2.
- Added information about the borrowing and consuming modifiers to the Parameter Modifiers section.
- Added information in Declaring Constants and Variables about setting a constant’s value after its declaration.
- Added more information about tasks, task groups, and task cancellation to the Concurrency chapter.
- Added information in the Macros chapter about implementing macros in an existing Swift package.
- Updated the attached section, now that extension macros have replaced conformance macros.
- Added the backDeployed section with information about back deployment.

## 2023-09-18
- Updated for Swift 5.9.
- Added information about if and switch expressions to the Control Flow chapter and the Conditional Expression section.
- Added the Macros chapter, with information about generating code at compile time.
- Expanded the discussion of optionals in The Basics.
- Added an example of concurrency to A Swift Tour.
- Added information about boxed protocol types to the Opaque and Boxed Protocol Types chapter.
- Added information about the buildPartialBlock(first:) and buildPartialBlock(accumulated:next:) methods to the Result Transformations section.
- Added visionOS to the lists of platforms in available and Conditional Compilation Block.
- Formatted the formal grammar to use blank lines for grouping.

## 2023-03-30
- Updated for Swift 5.8.
- Added the Deferred Actions section, showing defer outside of error handling.
- Adopted Swift-DocC for publication.
- Minor corrections and additions throughout.

## 2022-09-12
- Updated for Swift 5.7.
- Added the Sendable Types section, with information about sending data between actors and tasks, and added information about the @Sendable and @unchecked attributes to the Sendable and unchecked sections.
- Added the Regular Expression Literals section with information about creating a regular expression.
- Added information about the short form of if-let to the Optional Binding section.
- Added information about #unavailable to the Checking API Availability section.

## 2022-03-14
- Updated for Swift 5.6.
- Updated the Explicit Member Expression section with information about using #if around chained method calls and other postfix expressions.
- Updated the visual styling of figures throughout.

## 2021-09-20
- Updated for Swift 5.5.
- Added information about asynchronous functions, tasks, and actors to the Concurrency chapter, and to the Actor Declaration, Asynchronous Functions and Methods, and Await Operator sections.
- Updated the Identifiers section with information about identifiers that start with an underscore.

## 2021-04-26
- Updated for Swift 5.4.
- Added the Result Builders and resultBuilder sections with information about result builders.
- Added the Implicit Conversion to a Pointer Type section with information about how in-out parameters can be implicitly converted to unsafe pointers in a function call.
- Updated the Variadic Parameters and Function Declaration sections, now that a function can have multiple variadic parameters.
- Updated the Implicit Member Expression section, now that implicit member expressions can be chained together.

## 2020-09-16
- Updated for Swift 5.3.
- Added information about multiple trailing closures to the Trailing Closures section, and added information about how trailing closures are matched to parameters to the Function Call Expression section.
- Added information about synthesized implementations of Comparable for enumerations to the Adopting a Protocol Using a Synthesized Implementation section.
- Added the Contextual Where Clauses section now that you can write a generic where clause in more places.
- Added the Unowned Optional References section with information about using unowned references with optional values.
- Added information about the @main attribute to the main section.
- Added #filePath to the Literal Expression section, and updated the discussion of #file.
- Updated the Escaping Closures section, now that closures can refer to self implicitly in more scenarios.
- Updated the Handling Errors Using Do-Catch and Do Statement sections, now that a catch clause can match against multiple errors.
- Added more information about Any and moved it into the new Any Type section.
- Updated the Property Observers section, now that lazy properties can have observers.
- Updated the Protocol Declaration section, now that members of an enumeration can satisfy protocol requirements.
- Updated the Stored Variable Observers and Property Observers section to describe when the getter is called before the observer.
- Updated the Memory Safety chapter to mention atomic operations.

## 2020-03-24
- Updated for Swift 5.2.
- Added information about passing a key path instead of a closure to the Key-Path Expression section.
- Added the Methods with Special Names section with information about syntactic sugar the lets instances of classes, structures, and enumerations be used with function call syntax.
- Updated the Subscript Options section, now that subscripts support parameters with default values.
- Updated the Self Type section, now that the Self can be used in more contexts.
- Updated the Implicitly Unwrapped Optionals section to make it clearer that an implicitly unwrapped optional value can be used as either an optional or non-optional value.

## 2019-09-10
- Updated for Swift 5.1.
- Added information about functions that specify a protocol that their return value conforms to, instead of providing a specific named return type, to the Opaque and Boxed Protocol Types chapter.
- Added information about property wrappers to the Property Wrappers section.
- Added information about enumerations and structures that are frozen for library evolution to the frozen section.
- Added the Functions With an Implicit Return and Shorthand Getter Declaration sections with information about functions that omit return.
- Added information about using subscripts on types to the Type Subscripts section.
- Updated the Enumeration Case Pattern section, now that an enumeration case pattern can match an optional value.
- Updated the Memberwise Initializers for Structure Types section, now that memberwise initializers support omitting parameters for properties that have a default value.
- Added information about dynamic members that are looked up by key path at runtime to the dynamicMemberLookup section.
- Added macCatalyst to the list of target environments in Conditional Compilation Block.
- Updated the Self Type section, now that Self can be used to refer to the type introduced by the current class, structure, or enumeration declaration.

## 2019-03-25
- Updated for Swift 5.0.
- Added the Extended String Delimiters section and updated the String Literals section with information about extended string delimiters.
- Added the dynamicCallable section with information about dynamically calling instances as functions using the dynamicCallable attribute.
- Added the unknown and Switching Over Future Enumeration Cases sections with information about handling future enumeration cases in switch statements using the unknown switch case attribute.
- Added information about the identity key path (\.self) to the Key-Path Expression section.
- Added information about using the less than (<) operator in platform conditions to the Conditional Compilation Block section.

## 2018-09-17
- Updated for Swift 4.2.
- Added information about accessing all of an enumeration’s cases to the Iterating over Enumeration Cases section.
- Added information about #error and #warning to the Compile-Time Diagnostic Statement section.
- Added information about inlining to the Declaration Attributes section under the inlinable and usableFromInline attributes.
- Added information about members that are looked up by name at runtime to the Declaration Attributes section under the dynamicMemberLookup attribute.
- Added information about the requires_stored_property_inits and warn_unqualified_access attributes to the Declaration Attributes section.
- Added information about how to conditionally compile code depending on the Swift compiler version being used to the Conditional Compilation Block section.
- Added information about #dsohandle to the Literal Expression section.

## 2018-03-29
- Updated for Swift 4.1.
- Added information about synthesized implementations of equivalence operators to the Equivalence Operators section.
- Added information about conditional protocol conformance to the Extension Declaration section of the Declarations chapter, and to the Conditionally Conforming to a Protocol section of the Protocols chapter.
- Added information about recursive protocol constraints to the Using a Protocol in Its Associated Type’s Constraints section.
- Added information about the canImport() and targetEnvironment() platform conditions to Conditional Compilation Block.

## 2017-12-04
- Updated for Swift 4.0.3.
- Updated the Key-Path Expression section, now that key paths support subscript components.

## 2017-09-19
- Updated for Swift 4.0.
- Added information about exclusive access to memory to the Memory Safety chapter.
- Added the Associated Types with a Generic Where Clause section, now that you can use generic where clauses to constrain associated types.
- Added information about multiline string literals to the String Literals section of the Strings and Characters chapter, and to the String Literals section of the Lexical Structure chapter.
- Updated the discussion of the objc attribute in Declaration Attributes, now that this attribute is inferred in fewer places.
- Added the Generic Subscripts section, now that subscripts can be generic.
- Updated the discussion in the Protocol Composition section of the Protocols chapter, and in the Protocol Composition Type section of the Types chapter, now that protocol composition types can contain a superclass requirement.
- Updated the discussion of protocol extensions in Extension Declaration now that final isn’t allowed in them.
- Added information about preconditions and fatal errors to the Assertions and Preconditions section.

## 2017-03-27
- Updated for Swift 3.1.
- Added the Extensions with a Generic Where Clause section with information about extensions that include requirements.
- Added examples of iterating over a range to the For-In Loops section.
- Added an example of failable numeric conversions to the Failable Initializers section.
- Added information to the Declaration Attributes section about using the available attribute with a Swift language version.
- Updated the discussion in the Function Type section to note that argument labels aren’t allowed when writing a function type.
- Updated the discussion of Swift language version numbers in the Conditional Compilation Block section, now that an optional patch number is allowed.
- Updated the discussion in the Function Type section, now that Swift distinguishes between functions that take multiple parameters and functions that take a single parameter of a tuple type.
- Removed the Dynamic Type Expression section from the Expressions chapter, now that type(of:) is a Swift standard library function.

## 2016-10-27
- Updated for Swift 3.0.1.
- Updated the discussion of weak and unowned references in the Automatic Reference Counting chapter.
- Added information about the unowned, unowned(safe), and unowned(unsafe) declaration modifiers in the Declaration Modifiers section.
- Added a note to the Type Casting for Any and AnyObject section about using an optional value when a value of type Any is expected.
- Updated the Expressions chapter to separate the discussion of parenthesized expressions and tuple expressions.

## 2016-09-13
- Updated for Swift 3.0.
- Updated the discussion of functions in the Functions chapter and the Function Declaration section to note that all parameters get an argument label by default.
- Updated the discussion of operators in the Advanced Operators chapter, now that you implement them as type methods instead of as global functions.
- Added information about the open and fileprivate access-level modifiers to the Access Control chapter.
- Updated the discussion of inout in the Function Declaration section to note that it appears in front of a parameter’s type instead of in front of a parameter’s name.
- Updated the discussion of the @noescape and @autoclosure attributes in the Escaping Closures and Autoclosures sections and the Attributes chapter now that they’re type attributes, rather than declaration attributes.
- Added information about operator precedence groups to the Precedence for Custom Infix Operators section of the Advanced Operators chapter, and to the Precedence Group Declaration section of the Declarations chapter.
- Updated discussion throughout to use macOS instead of OS X, Error instead of ErrorProtocol, and protocol names such as ExpressibleByStringLiteral instead of StringLiteralConvertible.
- Updated the discussion in the Generic Where Clauses section of the Generics chapter and in the Generic Parameters and Arguments chapter, now that generic where clauses are written at the end of a declaration.
- Updated the discussion in the Escaping Closures section, now that closures are nonescaping by default.
- Updated the discussion in the Optional Binding section of the The Basics chapter and the While Statement section of the Statements chapter, now that if, while, and guard statements use a comma-separated list of conditions without where clauses.
- Added information about switch cases that have multiple patterns to the Switch section of the Control Flow chapter and the Switch Statement section of the Statements chapter.
- Updated the discussion of function types in the Function Type section now that function argument labels are no longer part of a function’s type.
- Updated the discussion of protocol composition types in the Protocol Composition section of the Protocols chapter and in the Protocol Composition Type section of the Types chapter to use the new Protocol1 & Protocol2 syntax.
- Updated the discussion in the Dynamic Type Expression section to use the new type(of:) syntax for dynamic type expressions.
- Updated the discussion of line control statements to use the #sourceLocation(file:line:) syntax in the Line Control Statement section.
- Updated the discussion in Functions that Never Return to use the new Never type.
- Added information about playground literals to the Literal Expression section.
- Updated the discussion in the In-Out Parameters section to note that only nonescaping closures can capture in-out parameters.
- Updated the discussion about default parameters in the Default Parameter Values section, now that they can’t be reordered in function calls.
- Updated attribute arguments to use a colon in the Attributes chapter.
- Added information about throwing an error inside the catch block of a rethrowing function to the Rethrowing Functions and Methods section.
- Added information about accessing the selector of an Objective-C property’s getter or setter to the Selector Expression section.
- Added information to the Type Alias Declaration section about generic type aliases and using type aliases inside of protocols.
- Updated the discussion of function types in the Function Type section to note that parentheses around the parameter types are required.
- Updated the Attributes chapter to note that the @IBAction, @IBOutlet, and @NSManaged attributes imply the @objc attribute.
- Added information about the @GKInspectable attribute to the Declaration Attributes section.
- Updated the discussion of optional protocol requirements in the Optional Protocol Requirements section to clarify that they’re used only in code that interoperates with Objective-C.
- Removed the discussion of explicitly using let in function parameters from the Function Declaration section.
- Removed the discussion of the Boolean protocol from the Statements chapter, now that the protocol has been removed from the Swift standard library.
- Corrected the discussion of the @NSApplicationMain attribute in the Declaration Attributes section.

## 2016-03-21
- Updated for Swift 2.2.
- Added information about how to conditionally compile code depending on the version of Swift being used to the Conditional Compilation Block section.
- Added information about how to distinguish between methods or initializers whose names differ only by the names of their arguments to the Explicit Member Expression section.
- Added information about the #selector syntax for Objective-C selectors to the Selector Expression section.
- Updated the discussion of associated types to use the associatedtype keyword in the Associated Types and Protocol Associated Type Declaration sections.
- Updated information about initializers that return nil before the instance is fully initialized in the Failable Initializers section.
- Added information about comparing tuples to the Comparison Operators section.
- Added information about using keywords as external parameter names to the Keywords and Punctuation section.
- Updated the discussion of the @objc attribute in the Declaration Attributes section to note that enumerations and enumeration cases can use this attribute.
- Updated the Operators section with discussion of custom operators that contain a dot.
- Added a note to the Rethrowing Functions and Methods section that rethrowing functions can’t directly throw errors.
- Added a note to the Property Observers section about property observers being called when you pass a property as an in-out parameter.
- Added a section about error handling to the A Swift Tour chapter.
- Updated figures in the Weak References section to show the deallocation process more clearly.
- Removed discussion of C-style for loops, the ++ prefix and postfix operators, and the -- prefix and postfix operators.
- Removed discussion of variable function arguments and the special syntax for curried functions.

## 2015-10-20
- Updated for Swift 2.1.
- Updated the String Interpolation and String Literals sections now that string interpolations can contain string literals.
- Added the Escaping Closures section with information about the @noescape attribute.
- Updated the Declaration Attributes and Conditional Compilation Block sections with information about tvOS.
- Added information about the behavior of in-out parameters to the In-Out Parameters section.
- Added information to the Capture Lists section about how values specified in closure capture lists are captured.
- Updated the Accessing Properties Through Optional Chaining section to clarify how assignment through optional chaining behaves.
- Improved the discussion of autoclosures in the Autoclosures section.
- Added an example that uses the ?? operator to the A Swift Tour chapter.

## 2015-09-16
- Updated for Swift 2.0.
- Added information about error handling to the Error Handling chapter, the Do Statement section, the Throw Statement section, the Defer Statement section, and the Try Operator section.
- Updated the Representing and Throwing Errors section, now that all types can conform to the ErrorType protocol.
- Added information about the new try? keyword to the Converting Errors to Optional Values section.
- Added information about recursive enumerations to the Recursive Enumerations section of the Enumerations chapter and the Enumerations with Cases of Any Type section of the Declarations chapter.
- Added information about API availability checking to the Checking API Availability section of the Control Flow chapter and the Availability Condition section of the Statements chapter.
- Added information about the new guard statement to the Early Exit section of the Control Flow chapter and the Guard Statement section of the Statements chapter.
- Added information about protocol extensions to the Protocol Extensions section of the Protocols chapter.
- Added information about access control for unit testing to the Access Levels for Unit Test Targets section of the Access Control chapter.
- Added information about the new optional pattern to the Optional Pattern section of the Patterns chapter.
- Updated the Repeat-While section with information about the repeat-while loop.
- Updated the Strings and Characters chapter, now that String no longer conforms to the CollectionType protocol from the Swift standard library.
- Added information about the new Swift standard library print(_:separator:terminator) function to the Printing Constants and Variables section.
- Added information about the behavior of enumeration cases with String raw values to the Implicitly Assigned Raw Values section of the Enumerations chapter and the Enumerations with Cases of a Raw-Value Type section of the Declarations chapter.
- Added information about the @autoclosure attribute — including its @autoclosure(escaping) form — to the Autoclosures section.
- Updated the Declaration Attributes section with information about the @available and @warn_unused_result attributes.
- Updated the Type Attributes section with information about the @convention attribute.
- Added an example of using multiple optional bindings with a where clause to the Optional Binding section.
- Added information to the String Literals section about how concatenating string literals using the + operator happens at compile time.
- Added information to the Metatype Type section about comparing metatype values and using them to construct instances with initializer expressions.
- Added a note to the Debugging with Assertions section about when user-defined assertions are disabled.
- Updated the discussion of the @NSManaged attribute in the Declaration Attributes section, now that the attribute can be applied to certain instance methods.
- Updated the Variadic Parameters section, now that variadic parameters can be declared in any position in a function’s parameter list.
- Added information to the Overriding a Failable Initializer section about how a nonfailable initializer can delegate up to a failable initializer by force-unwrapping the result of the superclass’s initializer.
- Added information about using enumeration cases as functions to the Enumerations with Cases of Any Type section.
- Added information about explicitly referencing an initializer to the Initializer Expression section.
- Added information about build configuration and line control statements to the Compiler Control Statements section.
- Added a note to the Metatype Type section about constructing class instances from metatype values.
- Added a note to the Weak References section about weak references being unsuitable for caching.
- Updated a note in the Type Properties section to mention that stored type properties are lazily initialized.
- Updated the Capturing Values section to clarify how variables and constants are captured in closures.
- Updated the Declaration Attributes section to describe when you can apply the @objc attribute to classes.
- Added a note to the Handling Errors section about the performance of executing a throw statement. Added similar information about the do statement in the Do Statement section.
- Updated the Type Properties section with information about stored and computed type properties for classes, structures, and enumerations.
- Updated the Break Statement section with information about labeled break statements.
- Updated a note in the Property Observers section to clarify the behavior of willSet and didSet observers.
- Added a note to the Access Levels section with information about the scope of private access.
- Added a note to the Weak References section about the differences in weak references between garbage collected systems and ARC.
- Updated the Special Characters in String Literals section with a more precise definition of Unicode scalars.

## 2015-04-08
- Updated for Swift 1.2.
- Swift now has a native Set collection type. For more information, see Sets.
- @autoclosure is now an attribute of the parameter declaration, not its type. There’s also a new @noescape parameter declaration attribute. For more information, see Declaration Attributes.
- Type methods and properties now use the static keyword as a declaration modifier. For more information see Type Variable Properties.
- Swift now includes the as? and as! failable downcast operators. For more information, see Checking for Protocol Conformance.
- Added a new guide section about String Indices.
- Removed the overflow division (&/) and overflow remainder (&%) operators from Overflow Operators.
- Updated the rules for constant and constant property declaration and initialization. For more information, see Constant Declaration.
- Updated the definition of Unicode scalars in string literals. See Special Characters in String Literals.
- Updated Range Operators to note that a half-open range with the same start and end index will be empty.
- Updated Closures Are Reference Types to clarify the capturing rules for variables.
- Updated Value Overflow to clarify the overflow behavior of signed and unsigned integers
- Updated Protocol Declaration to clarify protocol declaration scope and members.
- Updated Defining a Capture List to clarify the syntax for weak and unowned references in closure capture lists.
- Updated Operators to explicitly mention examples of supported characters for custom operators, such as those in the Mathematical Operators, Miscellaneous Symbols, and Dingbats Unicode blocks.
- Constants can now be declared without being initialized in local function scope. They must have a set value before first use. For more information, see Constant Declaration.
- In an initializer, constant properties can now only assign a value once. For more information, see Assigning Constant Properties During Initialization.
- Multiple optional bindings can now appear in a single if statement as a comma-separated list of assignment expressions. For more information, see Optional Binding.
- An Optional-Chaining Expression must appear within a postfix expression.
- Protocol casts are no longer limited to @objc protocols.
- Type casts that can fail at runtime now use the as? or as! operator, and type casts that are guaranteed not to fail use the as operator. For more information, see Type-Casting Operators.

## 2014-10-16
- Updated for Swift 1.1.
- Added a full guide to Failable Initializers.
- Added a description of Failable Initializer Requirements for protocols.
- Constants and variables of type Any can now contain function instances. Updated the example in Type Casting for Any and AnyObject to show how to check for and cast to a function type within a switch statement.
- Enumerations with raw values now have a rawValue property rather than a toRaw() method and a failable initializer with a rawValue parameter rather than a fromRaw() method. For more information, see Raw Values and Enumerations with Cases of a Raw-Value Type.
- Added a new reference section about Failable Initializers, which can trigger initialization failure.
- Custom operators can now contain the ? character. Updated the Operators reference to describe the revised rules. Removed a duplicate description of the valid set of operator characters from Custom Operators.

## 2014-08-18
- New document that describes Swift 1.0, Apple’s new programming language for building iOS and OS X apps.
- Added a new section about Initializer Requirements in protocols.
- Added a new section about Class-Only Protocols.
- Assertions and Preconditions can now use string interpolation. Removed a note to the contrary.
- Updated the Concatenating Strings and Characters section to reflect the fact that String and Character values can no longer be combined with the addition operator (+) or addition assignment operator (+=). These operators are now used only with String values. Use the String type’s append(_:) method to append a single Character value onto the end of a string.
- Added information about the availability attribute to the Declaration Attributes section.
- Optionals no longer implicitly evaluate to true when they have a value and false when they do not, to avoid confusion when working with optional Bool values. Instead, make an explicit check against nil with the == or != operators to find out if an optional contains a value.
- Swift now has a Nil-Coalescing Operator (a ?? b), which unwraps an optional’s value if it exists, or returns a default value if the optional is nil.
- Updated and expanded the Comparing Strings section to reflect and demonstrate that string and character comparison and prefix / suffix comparison are now based on Unicode canonical equivalence of extended grapheme clusters.
- You can now try to set a property’s value, assign to a subscript, or call a mutating method or operator through Optional Chaining. The information about Accessing Properties Through Optional Chaining has been updated accordingly, and the examples of checking for method call success in Calling Methods Through Optional Chaining have been expanded to show how to check for property setting success.
- Added a new section about Accessing Subscripts of Optional Type through optional chaining.
- Updated the Accessing and Modifying an Array section to note that you can no longer append a single item to an array with the += operator. Instead, use the append(_:) method, or append a single-item array with the += operator.
- Added a note that the start value a for the Range Operators a...b and a..<b must not be greater than the end value b.
- Rewrote the Inheritance chapter to remove its introductory coverage of initializer overrides. This chapter now focuses more on the addition of new functionality in a subclass, and the modification of existing functionality with overrides. The chapter’s example of Overriding Property Getters and Setters has been rewritten to show how to override a description property. (The examples of modifying an inherited property’s default value in a subclass initializer have been moved to the Initialization chapter.)
- Updated the Initializer Inheritance and Overriding section to note that overrides of a designated initializer must now be marked with the override modifier.
- Updated the Required Initializers section to note that the required modifier is now written before every subclass implementation of a required initializer, and that the requirements for required initializers can now be satisfied by automatically inherited initializers.
- Infix Operator Methods no longer require the @infix attribute.
- The @prefix and @postfix attributes for Prefix and Postfix Operators have been replaced by prefix and postfix declaration modifiers.
- Added a note about the order in which Prefix and Postfix Operators are applied when both a prefix and a postfix operator are applied to the same operand.
- Operator functions for Compound Assignment Operators no longer use the @assignment attribute when defining the function.
- The order in which modifiers are specified when defining Custom Operators has changed. You now write prefix operator rather than operator prefix, for example.
- Added information about the dynamic declaration modifier in Declaration Modifiers.
- Added information about how type inference works with Literals.
- Added more information about curried functions.
- Added a new chapter about Access Control.
- Updated the Strings and Characters chapter to reflect the fact that Swift’s Character type now represents a single Unicode extended grapheme cluster. Includes a new section on Extended Grapheme Clusters and more information about Unicode Scalar Values and Comparing Strings.
- Updated the String Literals section to note that Unicode scalars inside string literals are now written as \u{n}, where n is a hexadecimal number between 0 and 10FFFF, the range of Unicode’s codespace.
- The NSString length property is now mapped onto Swift’s native String type as utf16Count, not utf16count.
- Swift’s native String type no longer has an uppercaseString or lowercaseString property. The corresponding section in Strings and Characters has been removed, and various code examples have been updated.
- Added a new section about Initializer Parameters Without Argument Labels.
- Added a new section about Required Initializers.
- Added a new section about Optional Tuple Return Types.
- Updated the Type Annotations section to note that multiple related variables can be defined on a single line with one type annotation.
- The @optional, @lazy, @final, and @required attributes are now the optional, lazy, final, and required Declaration Modifiers.
- Updated the entire book to refer to ..< as the Half-Open Range Operator (rather than the “half-closed range operator”).
- Updated the Accessing and Modifying a Dictionary section to note that Dictionary now has a Boolean isEmpty property.
- Clarified the full list of characters that can be used when defining Custom Operators.
- nil and the Booleans true and false are now Literals.
- Swift’s Array type now has full value semantics. Updated the information about Mutability of Collections and Arrays to reflect the new approach. Also clarified the assignment and copy behavior for strings arrays and dictionaries.
- Array Type Shorthand Syntax is now written as [SomeType] rather than SomeType[].
- Added a new section about Dictionary Type Shorthand Syntax, which is written as [KeyType: ValueType].
- Added a new section about Hash Values for Set Types.
- Examples of Closure Expressions now use the global sorted(_:_:) function rather than the global sort(_:_:) function, to reflect the new array value semantics.
- Updated the information about Memberwise Initializers for Structure Types to clarify that the memberwise structure initializer is made available even if a structure’s stored properties don’t have default values.
- Updated to ..< rather than .. for the Half-Open Range Operator.
- Added an example of Extending a Generic Type.