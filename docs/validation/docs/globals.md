[@rgadigital/react-hooks-validation Documentation](globals.md)

# @rgadigital/react-hooks-validation Documentation

## Index

### Type aliases

* [MaxLengthOptionsType](globals.md#maxlengthoptionstype)
* [MinLengthOptionsType](globals.md#minlengthoptionstype)
* [ValidatorConstructorType](globals.md#validatorconstructortype)
* [ValidatorType](globals.md#validatortype)

### Validator Functions

* [maxLength](globals.md#const-maxlength)
* [minLength](globals.md#const-minlength)

### Object literals

* [defaultOptions](globals.md#const-defaultoptions)

## Type aliases

###  MaxLengthOptionsType

Ƭ **MaxLengthOptionsType**: *object*

Defined in validation/src/validators/maxLength.ts:9

Describes how an error message should be formatted

**`param`** message Override message templating

**`param`** entity Override entity to be used in default template

**`param`** template Override templating function

#### Type declaration:

* **entity**: *string*

* **message**? : *undefined | string*

* **template**(): *function*

  * (`props`: [MaxLengthOptionsType](globals.md#maxlengthoptionstype)): *string*

___

###  MinLengthOptionsType

Ƭ **MinLengthOptionsType**: *object*

Defined in validation/src/validators/minLength.ts:9

Describes how an error message should be formatted

**`param`** string Override message templating

**`param`** string Override entity to be used in default template

**`param`** Function Override templating function

#### Type declaration:

* **entity**: *string*

* **message**? : *undefined | string*

* **template**(): *function*

  * (`props`: [MinLengthOptionsType](globals.md#minlengthoptionstype)): *string*

___

###  ValidatorConstructorType

Ƭ **ValidatorConstructorType**: *function*

Defined in validation/src/types.ts:5

#### Type declaration:

▸ (...`args`: any[]): *[ValidatorType](globals.md#validatortype)*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

___

###  ValidatorType

Ƭ **ValidatorType**: *function*

Defined in validation/src/types.ts:1

#### Type declaration:

▸ (`input`: string): *string | void*

**Parameters:**

Name | Type |
------ | ------ |
`input` | string |

## Validator Functions

### `Const` maxLength

▸ **maxLength**(`length`: number, `props`: [MaxLengthOptionsType](globals.md#maxlengthoptionstype)): *[ValidatorType](globals.md#validatortype)*

Defined in validation/src/validators/maxLength.ts:29

Constructor for a maximum length validator

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`length` | number | - | Value to check length against |
`props` | [MaxLengthOptionsType](globals.md#maxlengthoptionstype) | defaultOptions | Configuration for error formatting |

**Returns:** *[ValidatorType](globals.md#validatortype)*

___

### `Const` minLength

▸ **minLength**(`length`: number, `props`: [MinLengthOptionsType](globals.md#minlengthoptionstype)): *[ValidatorType](globals.md#validatortype)*

Defined in validation/src/validators/minLength.ts:29

Constructor for a minimum length validator

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`length` | number | - | Value to check length against |
`props` | [MinLengthOptionsType](globals.md#minlengthoptionstype) | defaultOptions | Configuration for error formatting |

**Returns:** *[ValidatorType](globals.md#validatortype)*

## Object literals

### `Const` defaultOptions

### ▪ **defaultOptions**: *object*

Defined in validation/src/validators/maxLength.ts:18

Defined in validation/src/validators/minLength.ts:18

The default configuration for formatting
The default configuration for formatting

###  entity

• **entity**: *string* = "Input"

Defined in validation/src/validators/maxLength.ts:19

Defined in validation/src/validators/minLength.ts:19

###  template

▸ **template**(`__namedParameters`: object): *string*

Defined in validation/src/validators/maxLength.ts:20

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`entity` | string |

**Returns:** *string*

▸ **template**(`__namedParameters`: object): *string*

Defined in validation/src/validators/minLength.ts:20

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`entity` | string |

**Returns:** *string*
