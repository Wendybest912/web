<?php
class Character 
{
    private int $id;
    private int $userId;
    private string $name;
    private int $level;
    private int $experience;
    private int $health;
    private int $maxHp;
    private int $armor;
    private int $gold;
    private int $critChance;
    private int $critDmg;
    private int $esquive;
    private int $floor;
    private int $SpecialCooldown;
    private int $attack;

    public function __construct(array $data) 
    {
        $this->hydrate($data);
    }

    private function hydrate(array $data): void 
    {
        foreach ($data as $key => $value) {
            $method = 'set' . str_replace('_', '', ucwords($key, '_'));
            if (method_exists($this, $method)) {
                $this->$method($value);
            }
        }
    }

   public function getId(): int
    {
        return $this->id;
    }

    public function setId(int $id): void
    {
        $this->id = $id;
    }

    public function getUserId(): int
    {
        return $this->userId;
    }

    public function setUserId(int $userId): void
    {
        $this->userId = $userId;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function setName(string $name): void
    {
        $this->name = $name;
    }

    public function getAttack(): string
    {
        return $this->attack;
    }

    public function setAttack(string $attack): void
    {
        $this->attack = $attack;
    }

    public function getLevel(): int
    {
        return $this->level;
    }

    public function setLevel(int $level): void
    {
        $this->level = $level;
    }

    public function getExperience(): int
    {
        return $this->experience;
    }

    public function setExperience(int $experience): void
    {
        $this->experience = $experience;
    }

    public function getHealth(): int
    {
        return $this->health;
    }

    public function setHealth(int $health): void
    {
        $this->health = $health;
    }

     public function getmaxHp(): int
    {
        return $this->maxHp;
    }

    public function setmaxHp(int $maxHp): void
    {
        $this->health = $maxHp;
    }

    public function getArmor(): int
    {
        return $this->armor;
    }

    public function setArmor(int $armor): void
    {
        $this->armor = $armor;
    }

    public function getGold(): int
    {
        return $this->gold;
    }

    public function setGold(int $gold): void
    {
        $this->gold = $gold;
    }

    public function getCritChance(): int
    {
        return $this->critChance;
    }

    public function setCritChance(int $critChance): void
    {
        $this->critChance = $critChance;
    }

    public function getCritDmg(): int
    {
        return $this->critDmg;
    }

    public function setCritDmg(int $critDmg): void
    {
        $this->critDmg = $critDmg;
    }

    public function getEsquive(): int
    {
        return $this->esquive;
    }

    public function setEsquive(int $esquive): void
    {
        $this->esquive = $esquive;
    }

    public function getFloor(): int
    {
        return $this->floor;
    }

    public function setFloor(int $floor): void
    {
        $this->floor = $floor;
    }

    public function getSpecialCooldown(): int
    {
        return $this->SpecialCooldown;
    }

    public function setSpecialCooldown(int $SpecialCooldown): void
    {
        $this->floor = $SpecialCooldown;
    }
}