/**
 * Data Definition for Organization actors
 * @prop {object} org   -       Organization Info
 * @prop {string} org.type   -  Organization Type
 * @prop {string} org.specialization    -   Organization Specialization
 * @prop {number} dip   -       Diplomacy
 * @prop {number} esp   -       Espionage
 * @prop {number} lor   -       Lore
 * @prop {number} opr   -       Operations
 * @prop {number} com   -       Communications
 * @prop {number} rlv   -       Resolve
 * @prop {number} rsc   -       Resources
 * @prop {object} power -       The power pool
 * @prop {number} power.die  -  The size of the organization's power die
 * @prop {number} power.pool -  The number of power dice available to the organization
 * @prop {object} powers     -  A mapping field of the domain powers
 * @prop {object} features   -  A mapping field of the organization's features
 */
export default class OrganizationData extends foundry.abstract.TypeDataModel {
  /** @override */
  static defineSchema() {
    const fields = foundry.data.fields;
    const MappingField = game.dnd5e.dataModels.fields.MappingField;
    const data = {
      org: new fields.SchemaField({
        type: new fields.StringField({ textSearch: true }),
        specialization: new fields.StringField({ textSearch: true }),
      }),
      dip: new fields.NumberField({
        required: true,
        initial: -1,
        nullable: false,
        integer: true,
      }),
      esp: new fields.NumberField({
        required: true,
        initial: -1,
        nullable: false,
        integer: true,
      }),
      lor: new fields.NumberField({
        required: true,
        initial: -1,
        nullable: false,
        integer: true,
      }),
      opr: new fields.NumberField({
        required: true,
        initial: -1,
        nullable: false,
        integer: true,
      }),
      com: new fields.SchemaField({
        score: new fields.NumberField({
          required: true,
          initial: 10,
          nullable: false,
          integer: true,
        }),
        level: new fields.NumberField({
          required: true,
          initial: 0,
          choices: Array.from(CONFIG.KNW.CHOICES.COMMUNICATIONS, level => level.value),
        }),
      }),
      rlv: new fields.SchemaField({
        score: new fields.NumberField({
          required: true,
          initial: 10,
          nullable: false,
          integer: true,
        }),
        level: new fields.NumberField({
          required: true,
          initial: 0,
          choices: Array.from(CONFIG.KNW.CHOICES.RESOLVE, level => level.value),
        }),
      }),
      rsc: new fields.SchemaField({
        score: new fields.NumberField({
          required: true,
          initial: 10,
          nullable: false,
          integer: true,
        }),
        level: new fields.NumberField({
          required: true,
          initial: 0,
          choices: Array.from(CONFIG.KNW.CHOICES.RESOURCES, level => level.value),
        }),
      }),
      size: new fields.NumberField({
        required: true,
        initial: 1,
        choices: CONFIG.KNW.CHOICES.SIZE,
      }),
      powerPool: new MappingField(
        new fields.NumberField({
          required: true,
          nullable: false,
          initial: 4,
          integer: true,
          max: 12,
          min: 0,
        }),
        {}
      ),
      powers: new MappingField(
        new fields.SchemaField({
          label: new fields.StringField({
            textSearch: true,
          }),
          description: new fields.StringField({}),
          sort: new fields.IntegerSortField({}),
        }),
        {}
      ),
      features: new MappingField(
        new fields.SchemaField({
          label: new fields.StringField({
            textSearch: true,
          }),
          description: new fields.StringField({}),
          sort: new fields.IntegerSortField({}),
        }),
        {}
      ),
    };

    return data;
  }

  get powerDie() {
    return CONFIG.KNW.CHOICES.SIZE[this.size].powerDie;
  }
}
